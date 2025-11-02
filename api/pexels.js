export default async function handler(req, res) {
  const KEY = process.env.PEXELS_API_KEY;
  if (!KEY) return res.status(500).json({ error: 'Missing API key' });

  const query = req.query.q || 'nature';
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=12`;

  const r = await fetch(url, { headers: { Authorization: KEY } });
  const data = await r.json();

  res.status(200).json(data);
}
