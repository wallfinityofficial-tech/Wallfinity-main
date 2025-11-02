// api/pexels.js
export default async function handler(req, res) {
  const KEY = process.env.PEXELS_API_KEY;
  if (!KEY) return res.status(500).json({ error: "Missing API key" });

  const query = req.query.q || "nature";
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=12`;

  try {
    const r = await fetch(url, { headers: { Authorization: KEY } });
    if (!r.ok) return res.status(r.status).json({ error: "Pexels request failed" });

    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "Server error", details: e.message });
  }
}
