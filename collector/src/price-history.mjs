import { mkdir, readFile, writeFile, unlink } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import { gzipSync, gunzipSync } from 'node:zlib';
import path from 'node:path';

export class PriceHistory {
  constructor(file) {
    this.file=file.replace(/\.json$/,'.sqlite');
    this.legacyFile=this.file.replace(/\.sqlite$/,'.json');
    this.pending=Promise.resolve();
  }
  async init() {
    await mkdir(path.dirname(this.file), { recursive: true });
    this.db=new DatabaseSync(this.file);
    this.db.exec(`PRAGMA journal_mode=WAL; PRAGMA synchronous=NORMAL; PRAGMA busy_timeout=5000;
      CREATE TABLE IF NOT EXISTS games(id INTEGER PRIMARY KEY, key TEXT NOT NULL UNIQUE);
      CREATE TABLE IF NOT EXISTS prices(game INTEGER NOT NULL,time INTEGER NOT NULL,price INTEGER NOT NULL,
        old INTEGER,note TEXT,PRIMARY KEY(game,time)) WITHOUT ROWID;
      CREATE TABLE IF NOT EXISTS metadata(key TEXT PRIMARY KEY,value TEXT) WITHOUT ROWID;`);
    this.addGame=this.db.prepare('INSERT OR IGNORE INTO games(key) VALUES(?)');
    this.getGame=this.db.prepare('SELECT id FROM games WHERE key=?');
    this.lastPrice=this.db.prepare('SELECT time,price FROM prices WHERE game=? ORDER BY time DESC LIMIT 1');
    this.addPrice=this.db.prepare('INSERT OR IGNORE INTO prices VALUES(?,?,?,?,?)');
    if(!this.db.prepare("SELECT 1 FROM metadata WHERE key='json-migrated'").get()){
      let source;
      try{source=await readFile(this.legacyFile);}catch(error){if(error.code!=='ENOENT')throw error;}
      if(source){
        const records=JSON.parse(source.toString());
        this.transaction(()=>{
          for(const [key,history] of Object.entries(records)){
            this.addGame.run(key);const id=this.getGame.get(key).id;
            for(const record of history)this.insert(id,record);
          }
          this.db.prepare('INSERT INTO metadata VALUES(?,?)').run('json-migrated','1');
        });
      }
    }
    // 迁移已提交且压缩备份验证通过后，才移除旧 JSON。
    if(this.db.prepare("SELECT 1 FROM metadata WHERE key='json-migrated'").get()){
      try{
        const source=await readFile(this.legacyFile);
        await writeFile(`${this.legacyFile}.gz`,gzipSync(source,{level:9}));
        if(!gunzipSync(await readFile(`${this.legacyFile}.gz`)).equals(source))throw new Error('History backup verification failed');
        await unlink(this.legacyFile);
      }catch(error){if(error.code!=='ENOENT')throw error;}
    }
  }
  transaction(work){
    this.db.exec('BEGIN IMMEDIATE');
    try{work();this.db.exec('COMMIT');}catch(error){this.db.exec('ROLLBACK');throw error;}
  }
  insert(id,record){
    const time=Date.parse(record.date);
    if(!Number.isFinite(time)||!Number.isFinite(Number(record.price)))return;
    this.addPrice.run(id,time,Math.round(Number(record.price)*100),
      record.old==null?null:Math.round(Number(record.old)*100),record.note||null);
  }
  capture(snapshots) {
    const task=this.pending.then(()=>this.transaction(()=>{
      for (const [platform, snapshot] of Object.entries(snapshots)) {
        if (!snapshot?.updatedAt) continue;
        for (const game of snapshot.games || []) {
          if (game.price == null || game.priceAvailable === false || !Number.isFinite(Number(game.price)) || Number(game.price) < 0) continue;
          const key = `${platform}:${game.id || game.name}`;
          let id=this.getGame.get(key)?.id;
          const last=id?this.lastPrice.get(id):null;
          if(snapshot.stale && !(game.verified===true && (game.priceUpdatedAt || !last)))continue;
          if(game.priceStale && last)continue;
          const date=game.priceUpdatedAt||snapshot.updatedAt;
          const time=Date.parse(date),price=Math.round(Number(game.price)*100);
          if(!Number.isFinite(time)||(last&&(time<=last.time||last.price===price)))continue;
          if(!id){this.addGame.run(key);id=this.getGame.get(key).id;}
          this.insert(id,{date,price:game.price,old:game.old,note:last?'':snapshot.stale?'缓存价格建档（原始采集时间未核实）':'首次建档'});
        }
      }
    }));
    this.pending=task.catch(error=>console.error('Price history persistence failed:',error.message));
    return task;
  }
  query({keys=[],since=null,after=null,limit=1000}={}){
    const output={};
    const serialize=row=>({date:new Date(row.time).toISOString(),price:row.price/100,old:row.old==null?null:row.old/100,note:row.note||''});
    if(!keys.length){
      for(const row of this.db.prepare('SELECT g.key,p.* FROM games g JOIN prices p ON p.game=g.id ORDER BY g.id,p.time LIMIT ?').all(limit))
        (output[row.key]||=[]).push(serialize(row));
      return output;
    }
    const range=this.db.prepare('SELECT * FROM prices WHERE game=? AND time>=? ORDER BY time LIMIT ?');
    const baseline=this.db.prepare('SELECT * FROM prices WHERE game=? AND time<? ORDER BY time DESC LIMIT 1');
    for(const key of keys){
      const id=this.getGame.get(key)?.id;output[key]=[];if(!id)continue;
      const start=after!==null?after+1:since==null?0:since;
      const previous=since==null||after!==null?null:baseline.get(id,start);
      const rows=range.all(id,start,limit);if(previous)rows.unshift(previous);
      output[key]=rows.map(serialize);
    }
    return output;
  }
  continuations(histories){
    const next={};
    const later=this.db.prepare('SELECT 1 FROM prices WHERE game=? AND time>? LIMIT 1');
    for(const [key,records] of Object.entries(histories)){
      if(!records.length)continue;
      const last=records.at(-1).date;
      if(later.get(this.getGame.get(key).id,Date.parse(last)))next[key]=last;
    }
    return next;
  }
  close(){this.db.exec('PRAGMA wal_checkpoint(TRUNCATE)');this.db.close();}
}
