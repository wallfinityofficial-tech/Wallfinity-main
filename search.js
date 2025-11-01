// api/search.js
import { fetchPexels } from './pexels.js';
import { fetchPixabay } from './pixabay.js';
import { fetchUnsplash } from './unsplash.js';
import { fetchWallhaven } from './wallhaven.js'; // optional, will return [] if no key

export default async function handler(req, res){
  try{
    const q = (req.query.q || req.url.split('?q=')[1] || 'aesthetic').toString();
    // Run providers in parallel
    const [p1, p2, p3, p4] = await Promise.allSettled([
      fetchPexels(q),
      fetchPixabay(q),
      fetchUnsplash(q),
      fetchWallhaven(q)
    ]);
    // collect fulfilled results
    const results = [];
    [p1,p2,p3,p4].forEach(r => {
      if(r.status === 'fulfilled' && Array.isArray(r.value)) results.push(...r.value);
    });
    // shuffle lightly to mix sources
    for(let i = results.length -1; i>0; i--){
      const j = Math.floor(Math.random()*(i+1));
      [results[i], results[j]] = [results[j], results[i]];
    }
    res.setHeader('Content-Type','application/json');
    res.status(200).send(JSON.stringify({ results }));
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
}
