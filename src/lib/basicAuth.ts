// Small helper to build an HTTP Basic Authorization header from env vars.
// Use only server-side (getServerSideProps, API routes, tests).
export function getBasicAuthHeader(): string {
  const user = process.env.BASIC_AUTH_USER;
  const pass = process.env.BASIC_AUTH_PASS;
  if (!user || !pass) {
    throw new Error('BASIC_AUTH_USER and BASIC_AUTH_PASS must be set in environment');
  }
  const token = Buffer.from(`${user}:${pass}`).toString('base64');
  return `Basic ${token}`;
}

// Optional: build header from explicit values (useful in tests)
export function buildBasicAuthHeader(user: string, pass: string): string {
  return `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`;
}