
import { getPosts, getPages } from '@/lib/wpapi';

function extractFields(obj: any, prefix = ''): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
    const value = obj[key];
    const fieldKey = prefix ? `${prefix}.${key}` : key;
    if (value === null || value === undefined) {
      fields[fieldKey] = 'null';
    } else if (Array.isArray(value)) {
      fields[fieldKey] = `array[${value.length}]`;
      if (value.length > 0 && typeof value[0] === 'object') {
        Object.assign(fields, extractFields(value[0], fieldKey + '[0]'));
      }
    } else if (typeof value === 'object') {
      fields[fieldKey] = 'object';
      Object.assign(fields, extractFields(value, fieldKey));
    } else {
      fields[fieldKey] = typeof value;
    }
  }
  return fields;
}

export default async function WPAuditFields() {
  const posts = await getPosts();
  const pages = await getPages();
  const postFields = posts.length > 0 ? extractFields(posts[0]) : {};
  const pageFields = pages.length > 0 ? extractFields(pages[0]) : {};

  return (
    <div style={{ padding: 24 }}>
      <h1>WordPress Content Fields Audit</h1>
      <h2>Post Fields</h2>
      <table border={1} cellPadding={4} style={{ marginBottom: 24 }}>
        <thead><tr><th>Field</th><th>Type/Shape</th></tr></thead>
        <tbody>
          {Object.entries(postFields).map(([field, type]) => (
            <tr key={field}><td>{field}</td><td>{type}</td></tr>
          ))}
        </tbody>
      </table>
      <h2>Page Fields</h2>
      <table border={1} cellPadding={4}>
        <thead><tr><th>Field</th><th>Type/Shape</th></tr></thead>
        <tbody>
          {Object.entries(pageFields).map(([field, type]) => (
            <tr key={field}><td>{field}</td><td>{type}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
