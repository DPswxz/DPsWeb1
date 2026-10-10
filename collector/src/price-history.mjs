import { mkdir, readFile, writeFile, unlink } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import { gzipSync, gunzipSync } from 'node:zlib';
import path from 'node:path';

const searchKey=value=>String(value||'').replace(/[™®©]/g,'').normalize('NFKC').toLowerCase().replace(/[\p{P}\p{Z}\p{Cf}\s]/gu,'');

export class PriceHistory {
  constructor(file) {
    this.file=file.replace(/\.json$/,'.sqlite');
    this.legacyFile=this.file.replace(/\.sqlite$/,'.json');
    this.pending=Promise.resolve();
    this.catalogRevisions=new Map();
  }
  async init() {
    await mkdir(path.dirname(this.file), { recursive: true });
    this.db=new DatabaseSync(this.file);
    this.db.exec(`PRAGMA journal_mode=WAL; PRAGMA synchronous=NORMAL; PRAGMA busy_timeout=5000;
      CREATE TABLE IF NOT EXISTS games(id INTEGER PRIMARY KEY, key TEXT NOT NULL UNIQUE);
      CREATE TABLE IF NOT EXISTS prices(game INTEGER NOT NULL,time INTEGER NOT NULL,price INTEGER NOT NULL,
        old INTEGER,note TEXT,PRIMARY KEY(game,time)) WITHOUT ROWID;
      CREATE TABLE IF NOT EXISTS metadata(key TEXT PRIMARY KEY,value TEXT) WITHOUT ROWID;
      CREATE TABLE IF NOT EXISTS ranking_gaps(game INTEGER NOT NULL,start INTEGER NOT NULL,end INTEGER,
        PRIMARY KEY(game,start)) WITHOUT ROWID;
      CREATE TABLE IF NOT EXISTS game_catalog(game INTEGER PRIMARY KEY,platform TEXT NOT NULL,name TEXT NOT NULL,
        search TEXT NOT NULL,data TEXT NOT NULL,first_seen INTEGER NOT NULL,last_seen INTEGER NOT NULL,
        in_ranking INTEGER NOT NULL DEFAULT 0,rank INTEGER);
      CREATE INDEX IF NOT EXISTS catalog_region ON game_catalog(platform,last_seen DESC);
      CREATE INDEX IF NOT EXISTS catalog_recent ON game_catalog(last_seen DESC,game DESC);
      CREATE INDEX IF NOT EXISTS catalog_presence ON game_catalog(in_ranking,last_seen DESC);`);
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
    this.saveCatalog=this.db.prepare(`INSERT INTO game_catalog VALUES(?,?,?,?,?,?,?,?,?)
      ON CONFLICT(game) DO UPDATE SET name=excluded.name,search=excluded.search,data=excluded.data,
      first_seen=MIN(game_catalog.first_seen,excluded.first_seen),last_seen=MAX(game_catalog.last_seen,excluded.last_seen),
      in_ranking=excluded.in_ranking,rank=excluded.rank`);
    // 旧库只有商品 key 和价格时，也保留全部条目；当前缓存会补上名称和封面。
    const legacy=this.db.prepare(`SELECT g.id,g.key,MIN(p.time) first,MAX(p.time) last FROM games g
      LEFT JOIN prices p ON p.game=g.id WHERE NOT EXISTS(SELECT 1 FROM game_catalog c WHERE c.game=g.id)
      GROUP BY g.id`).all();
    this.transaction(()=>{for(const row of legacy){
      const split=row.key.indexOf(':'),platform=row.key.slice(0,split),id=row.key.slice(split+1);
      const data={id,name:id,cn:'',image:'',url:'',metadataMissing:true};
      this.saveCatalog.run(row.id,platform,id,searchKey(id),JSON.stringify(data),row.first||Date.now(),row.last||Date.now(),0,null);
    }});
    const invalid=this.db.prepare("SELECT g.key,p.* FROM prices p JOIN games g ON g.id=p.game WHERE p.price=0 AND p.note='缓存价格建档（原始采集时间未核实）' AND EXISTS(SELECT 1 FROM prices paid WHERE paid.game=p.game AND paid.price>0)").all();
    if(invalid.length){
      // 只清除未核实的缓存零价；可验证免费、促销零价和正常价格全部保留。
      await writeFile(this.file+'.invalid-zero-backup.json.gz',gzipSync(Buffer.from(JSON.stringify(invalid)),{level:9}));
      const remove=this.db.prepare('DELETE FROM prices WHERE game=? AND time=? AND price=0');
      this.transaction(()=>{for(const row of invalid)remove.run(row.game,row.time);});
      console.log(`已清除 ${invalid.length} 条未核实的缓存零价记录`);
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
    const task=this.pending.then(()=>{
      const revisions=new Map();
      this.transaction(()=>{
      for (const [platform, snapshot] of Object.entries(snapshots)) {
        if (!snapshot?.updatedAt) continue;
        const entries=(snapshot.games||[]).map(game=>({id:String(game.id||game.name),name:game.name||String(game.id),
          cn:game.cn||'',rawName:game.rawName||'',originalName:game.originalName||'',conceptId:game.conceptId||'',
          image:game.image||'',url:game.url||'',platform:game.platform||'',meta:game.meta||'',rank:game.rank||null}));
        const revision=JSON.stringify([snapshot.updatedAt,Boolean(snapshot.stale),entries]);
        if(this.catalogRevisions.get(platform)!==revision){
          const seen=Date.parse(snapshot.updatedAt);
          if(Number.isFinite(seen)){
            // 只按完整的新榜单记录退榜区间；失败、旧缓存和重启重放不能制造间隔。
            const observationKey=`ranking-observed:${platform}`;
            const observed=Number(this.db.prepare('SELECT value FROM metadata WHERE key=?').get(observationKey)?.value||0);
            if(seen<observed)continue;
            if(!snapshot.stale&&seen>observed){
              const present=new Set(entries.map(entry=>entry.id));
              const exited=this.db.prepare('SELECT c.game,g.key FROM game_catalog c JOIN games g ON g.id=c.game WHERE c.platform=? AND c.in_ranking=1').all(platform);
              const open=this.db.prepare('INSERT OR IGNORE INTO ranking_gaps SELECT ?,?,NULL WHERE NOT EXISTS(SELECT 1 FROM ranking_gaps WHERE game=? AND end IS NULL)');
              for(const row of exited)if(!present.has(row.key.slice(platform.length+1)))open.run(row.game,seen,row.game);
              const close=this.db.prepare('UPDATE ranking_gaps SET end=? WHERE game=? AND end IS NULL AND start<=?');
              for(const entry of entries){const id=this.getGame.get(`${platform}:${entry.id}`)?.id;if(id)close.run(seen,id,seen);}
              this.db.prepare('INSERT OR REPLACE INTO metadata VALUES(?,?)').run(observationKey,String(seen));
            }
            // 部分采集失败时，不能把暂未取得的商品误判为退榜。
            if(!snapshot.stale)this.db.prepare('UPDATE game_catalog SET in_ranking=0,rank=NULL WHERE platform=? AND in_ranking=1').run(platform);
            for(const entry of entries){
              const key=`${platform}:${entry.id}`;this.addGame.run(key);const id=this.getGame.get(key).id;
              this.saveCatalog.run(id,platform,entry.name,searchKey(`${entry.name} ${entry.cn} ${entry.rawName} ${entry.originalName}`),JSON.stringify(entry),seen,seen,1,entry.rank);
            }
            revisions.set(platform,revision);
          }
        }
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
      });
      for(const [platform,revision] of revisions)this.catalogRevisions.set(platform,revision);
    });
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
  rankingGaps(keys){
    const output={},query=this.db.prepare('SELECT start,end FROM ranking_gaps WHERE game=? ORDER BY start');
    for(const key of keys){const id=this.getGame.get(key)?.id;
      output[key]=id?query.all(id).map(row=>({from:new Date(row.start).toISOString(),to:row.end===null?null:new Date(row.end).toISOString()})):[];
    }return output;
  }
  catalog({platform='',query='',status='',page=1,limit=50,includeUnresolved=false}={}){
    const named="COALESCE(json_extract(c.data,'$.metadataMissing'),0)=0 AND trim(c.name)<>'' AND c.name<>COALESCE(json_extract(c.data,'$.id'),'')";
    const clauses=includeUnresolved?[]:[named],args=[];
    if(platform){clauses.push('c.platform=?');args.push(platform);}
    if(query){clauses.push('instr(c.search,?)>0');args.push(searchKey(query));}
    if(status==='current'||status==='exited'){clauses.push('c.in_ranking=?');args.push(status==='current'?1:0);}
    const where=clauses.length?' WHERE '+clauses.join(' AND '):'';
    const total=this.db.prepare('SELECT COUNT(*) count FROM game_catalog c'+where).get(...args).count;
    const pages=Math.max(1,Math.ceil(total/limit));page=Math.max(1,Math.min(page,pages));
    const rows=this.db.prepare(`SELECT c.*,
      (SELECT COUNT(*) FROM prices p WHERE p.game=c.game) records,
      (SELECT price FROM prices p WHERE p.game=c.game ORDER BY time DESC LIMIT 1) price,
      (SELECT old FROM prices p WHERE p.game=c.game ORDER BY time DESC LIMIT 1) old,
      (SELECT time FROM prices p WHERE p.game=c.game ORDER BY time DESC LIMIT 1) price_at
      FROM game_catalog c${where} ORDER BY c.last_seen DESC,c.game DESC LIMIT ? OFFSET ?`).all(...args,limit,(page-1)*limit);
    const stats=this.db.prepare('SELECT COUNT(*) total,COALESCE(SUM(in_ranking),0) current FROM game_catalog c'+(includeUnresolved?'':' WHERE '+named)).get();
    return {total,page,pages,limit,stats:{...stats,exited:stats.total-stats.current},games:rows.map(row=>{
      const data=JSON.parse(row.data),price=row.price===null?null:row.price/100,old=row.old===null?null:row.old/100;
      return {...data,historyPlatform:row.platform,historyCurrency:row.platform.endsWith('_hk')?'HKD':row.platform.startsWith('steam')?'CNY':'JPY',
        price,old,discount:old>price&&price>0?Math.round((1-price/old)*100):0,priceAvailable:price!==null,
        inRanking:Boolean(row.in_ranking),rank:row.rank,recordCount:row.records,
        firstSeen:new Date(row.first_seen).toISOString(),lastSeen:new Date(row.last_seen).toISOString(),
        priceUpdatedAt:row.price_at===null?null:new Date(row.price_at).toISOString(),archived:true};
    })};
  }
  restoreCatalogMetadata(snapshots){
    const find=this.db.prepare("SELECT g.id FROM games g JOIN game_catalog c ON c.game=g.id WHERE g.key=? AND json_extract(c.data,'$.metadataMissing')=1");
    const update=this.db.prepare('UPDATE game_catalog SET name=?,search=?,data=? WHERE game=?');
    let restored=0;
    this.transaction(()=>{for(const [platform,games] of Object.entries(snapshots))for(const game of games||[]){
      const row=find.get(`${platform}:${game.id||game.name}`);if(!row||!game.name)continue;
      const data={id:String(game.id||game.name),name:game.name,cn:game.cn||'',rawName:game.rawName||'',originalName:game.originalName||'',
        conceptId:game.conceptId||'',image:game.image||'',url:game.url||'',platform:game.platform||'',meta:game.meta||''};
      update.run(data.name,searchKey(`${data.name} ${data.cn} ${data.rawName} ${data.originalName}`),JSON.stringify(data),row.id);restored++;
    }});
    return restored;
  }
  restoreSharedMetadata(){
    const snapshots={};
    const known=this.db.prepare("SELECT platform,data FROM game_catalog WHERE COALESCE(json_extract(data,'$.metadataMissing'),0)=0").all();
    const lookup=new Map();
    for(const row of known){const data=JSON.parse(row.data),family=row.platform.replace(/_(?:hk|jp|global)$/,'').replace(/^switch[12]$/,'switch');
      for(const id of [data.id,data.conceptId].filter(Boolean))lookup.set(`${family}:${id}`,data);
    }
    for(const row of this.missingMetadata()){
      const family=row.platform.replace(/_(?:hk|jp|global)$/,'').replace(/^switch[12]$/,'switch');
      const data=lookup.get(`${family}:${row.id}`);
      if(data)(snapshots[row.platform]||=[]).push({...data,id:row.id});
    }
    return this.restoreCatalogMetadata(snapshots);
  }
  missingMetadata(){
    return this.db.prepare("SELECT c.platform,json_extract(c.data,'$.id') id FROM game_catalog c WHERE json_extract(c.data,'$.metadataMissing')=1").all();
  }
  refreshCatalogTitles(translate){
    const update=this.db.prepare('UPDATE game_catalog SET search=?,data=? WHERE game=?');let changed=0;
    this.transaction(()=>{for(const row of this.db.prepare("SELECT game,data FROM game_catalog WHERE COALESCE(json_extract(data,'$.metadataMissing'),0)=0").all()){
      const data=JSON.parse(row.data),cn=translate(data);if(!cn||cn===data.cn)continue;
      data.cn=cn;update.run(searchKey(`${data.name} ${cn} ${data.rawName||''} ${data.originalName||''}`),JSON.stringify(data),row.game);changed++;
    }});return changed;
  }
  close(){this.db.exec('PRAGMA wal_checkpoint(TRUNCATE)');this.db.close();}
}
