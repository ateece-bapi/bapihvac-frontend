// Example Next.js API route that proxies a request to the WP REST API
// and injects the Basic Auth header from env. Keep credentials server-side only.


import type { NextApiRequest, NextApiResponse } from 'next';
import { getBasicAuthHeader } from '../../lib/basicAuth';

// Ignore self-signed certs in local dev only
if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const wpBase = process.env.WP_API_URL;
  if (!wpBase) return res.status(500).json({ error: 'WP_API_URL not set' });

  // Example: proxy /api/wp-proxy/posts -> GET {WP_API_URL}/wp-json/wp/v2/posts
  const path = req.query.path ? String(req.query.path) : 'wp-json';
  const targetUrl = `${wpBase}/${path}`.replace(/\/+/g, '/').replace('http:/', 'http://');


  try {
    const headers: Record<string, string> = {
      Authorization: getBasicAuthHeader(),
      // Forward Accept or other headers if needed:
      Accept: req.headers.accept || 'application/json',
    };


    const fetchRes = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: ['GET', 'HEAD'].includes(String(req.method)) ? undefined : req.body,
    });

    // Forward status + headers (filter sensitive headers if needed)
    res.status(fetchRes.status);
    fetchRes.headers.forEach((value, name) => {
      // don't leak upstream auth headers
      if (name.toLowerCase() === 'www-authenticate') return;
      res.setHeader(name, value);
    });

    const body = await fetchRes.arrayBuffer();
    res.send(Buffer.from(body));
  } catch (err: any) {
    console.error('wp-proxy error:', err);
    res.status(500).json({ error: err?.message || 'proxy error' });
  }
}
