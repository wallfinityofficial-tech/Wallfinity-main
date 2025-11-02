// pexels.js
export async function getPexelsImages(query) {
  try {
    const res = await fetch(`/api/pexels?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    return (data.photos || []).map(p => ({
      thumbnail: p.src.large,
      full: p.src.original,
      author: p.photographer,
      url: p.url,
      source: "Pexels"
    }));
  } catch (err) {
    console.error("Pexels fetch failed:", err);
    return [];
  }
}
