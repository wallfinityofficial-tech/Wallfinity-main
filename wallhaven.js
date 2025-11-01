// api/wallhaven.js
export async function fetchWallhaven(query){
  const KEY = process.env.WALLHAVEN_API_KEY;
  if(!KEY) return [];
  const url = `https://wallhaven.cc/api/v1/search?q=${encodeURIComponent(query)}&apikey=${KEY}&sorting=toplist&per_page=12`;
  const res = await fetch(url);
  if(!res.ok){ console.error('Wallhaven status', res.status); return []; }
  const data = await res.json();
  return (data.data||[]).map(w => ({
    src: w.path,
    thumb: w.thumbs.large,
    author: 'Wallhaven',
    url: `https://wallhaven.cc/w/${w.id}`,
    source: 'Wallhaven'
  }));
}
