async function test() {
  const res = await fetch('https://store.playstation.com/ja-jp/product/JP0102-PPSA26873_00-FULLGAME00000001', {
    headers: { 'user-agent': 'Mozilla/5.0', 'accept-language': 'ja-JP' }
  });
  const html = await res.text();
  const nextData = JSON.parse(html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/)[1]);
  const info = nextData.props?.pageProps?.batarangs?.info;
  const json = JSON.stringify(info);
  // find subtitle or voice or language keys
  const matches = json.match(/"([^"]*?(?:voice|subtitle|lang)[^"]*?)":/gi);
  console.log('Language related keys:', matches);
  if (matches) {
    for (const m of matches) {
      const key = m.replace(/[":]/g, '');
      console.log('Value for', key, ':', json.match(new RegExp('"' + key + '":(\\[.*?\\]|"[^"]*?")')));
    }
  }
}
test();
