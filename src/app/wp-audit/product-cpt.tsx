import { getPosts } from '@/lib/wpapi';

export default async function WPAuditCPT() {
  // Example: fetch custom post type 'product' (WooCommerce)
  // You can change 'product' to any CPT slug you use
  const products = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://www.bapihvac.com/wp-json'}/wp/v2/product?per_page=5`
  ).then(res => res.json());

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

  const productFields = products && products.length > 0 ? extractFields(products[0]) : {};

  return (
    <div style={{ padding: 24 }}>
      <h1>Custom Post Type: Product (WooCommerce)</h1>
      <table border={1} cellPadding={4}>
        <thead><tr><th>Field</th><th>Type/Shape</th></tr></thead>
        <tbody>
          {Object.entries(productFields).map(([field, type]) => (
            <tr key={field}><td>{field}</td><td>{type}</td></tr>
          ))}
        </tbody>
      </table>
      <h2>Raw Data Example</h2>
      <pre style={{ background: '#eee', padding: 12, maxHeight: 300, overflow: 'auto' }}>{JSON.stringify(products[0], null, 2)}</pre>
    </div>
  );
}
