// api/unsplash.js
export async function fetchUnsplash(query){
  const KEY = process.env.UNSPLASH_API_KEY;
  if(!KEY) return [];
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12`;
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${KEY}` }});
  if(!res.ok){ console.error('Unsplash status', res.status); return []; }
  const data = await res.json();
  return (data.results||[]).map(r => ({
    src: r.urls.full,
    thumb: r.urls.regular,
    author: r.user?.name || r.user?.username,
    url: r.links.html,
    source: 'Unsplash'
  }));
}
