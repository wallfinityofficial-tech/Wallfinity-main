// api/pexels.js
export async function fetchPexels(query){
  const KEY = process.env.PEXELS_API_KEY;
  if(!KEY) return [];
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=12`;
  const res = await fetch(url, { headers: { Authorization: KEY }});
  if(!res.ok) { console.error('Pexels status', res.status); return []; }
  const data = await res.json();
  return (data.photos||[]).map(p => ({
    src: p.src.original,
    thumb: p.src.large,
    author: p.photographer,
    url: p.url,
    source: 'Pexels'
  }));
}
