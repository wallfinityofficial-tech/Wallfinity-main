// assets/trending.js
async function loadTrending(){
  const container = document.getElementById('trending-grid');
  if(!container) return;
  container.innerHTML = '<p style="text-align:center;color:#777;padding:20px">Loading...</p>';
  try{
    const res = await fetch('/api/search?q=trending'); // uses same endpoint
    const data = await res.json();
    const items = data.results || [];
    container.innerHTML = items.map(it => `<a href="${it.url}" target="_blank"><img src="${it.thumb || it.src}" alt="wall"></a>`).join('');
  }catch(e){
    container.innerHTML = '<p style="text-align:center;color:#f55">Failed to load trending.</p>';
  }
}
