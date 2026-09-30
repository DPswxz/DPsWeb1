async function testPsnJp() {
  const DEFAULT_GRAPHQL_ENDPOINT = 'https://web.np.playstation.com/api/graphql/v1//op';
  // Let's test standard category ID or check what categories exist
  const DEFAULT_CATEGORY_ID = '1cc408db-44ef-4610-91c2-b281a567356e';
  const DEFAULT_SHA256 = '88c0b9a1273c6d320c51cd73e390924e21ae28bf09f01cde8b84b1034b16cd03';

  const variables = {
    id: DEFAULT_CATEGORY_ID,
    pageArgs: { size: 10, offset: 0 },
    sortBy: null,
    filterBy: [],
    facetOptions: []
  };
  const extensions = {
    persistedQuery: { version: 1, sha256Hash: DEFAULT_SHA256 }
  };
  const url = `${DEFAULT_GRAPHQL_ENDPOINT}?operationName=categoryGridRetrieve&variables=${encodeURIComponent(JSON.stringify(variables))}&extensions=${encodeURIComponent(JSON.stringify(extensions))}`;
  const res = await fetch(url, {
    headers: {
      'content-type': 'application/json',
      'x-psn-store-locale-override': 'ja-JP',
      'x-psn-app-ver': '@sie-ppr-web-store/app/0.114.0-',
      'referer': 'https://store.playstation.com/',
      'accept-language': 'ja-JP',
      'accept': 'application/json',
      'apollographql-client-version': '0.114.0',
      'apollographql-client-name': '@sie-ppr-web-store/app',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36'
    }
  });

  console.log('Status:', res.status);
  const data = await res.json();
  const prods = data.data?.categoryGridRetrieve?.products || [];
  console.log('Returned products count:', prods.length);
  if (prods.length) {
    console.log('First product:', {
      id: prods[0].id,
      name: prods[0].name,
      price: prods[0].price,
      platforms: prods[0].platforms
    });
  }
}
testPsnJp();
