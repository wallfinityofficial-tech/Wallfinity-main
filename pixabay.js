// api/pixabay.js
export async function fetchPixabay(query){
  const KEY = process.env.PIXABAY_API_KEY;
  if(!KEY) return [];
  const url = `https://pixabay.com/api/?key=${KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=12`;
  const res = await fetch(url);
  if(!res.ok){ console.error('Pixabay status', res.status); return []; }
  const data = await res.json();
  return (data.hits||[]).map(h => ({
    src: h.largeImageURL,
    thumb: h.previewURL || h.webformatURL,
    author: h.user,
    url: h.pageURL,
    source: 'Pixabay'
  }));
}
