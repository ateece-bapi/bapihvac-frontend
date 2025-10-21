import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url = '' } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url param' });

  const apiUrl = decodeURIComponent(url as string);
  try {
    const wpRes = await fetch(apiUrl, {
      method: req.method,
      headers: { 'Content-Type': 'application/json' }, // Only minimal headers
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });
    const data = await wpRes.json();
    res.status(wpRes.status).json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
