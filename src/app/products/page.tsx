import { getProducts } from '@/lib/wordpress';

export default async function ProductsPage() {
  try {
    const products = await getProducts();

    return (
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>WooCommerce Products Test</h1>
        <p>Found {products.length} products</p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}>
          {products.map((product: any) => (
            <div 
              key={product.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1rem',
                backgroundColor: '#fff'
              }}
            >
              {product.images && product.images[0] && (
                <img 
                  src={product.images[0].src} 
                  alt={product.name}
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
                />
              )}
              <h3 style={{ marginTop: '1rem' }}>{product.name}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>SKU: {product.sku}</p>
              <p style={{ fontWeight: 'bold', fontSize: '1.2rem', marginTop: '0.5rem' }}>
                ${product.price}
              </p>
            </div>
          ))}
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main style={{ padding: '2rem' }}>
        <h1>Error Loading Products</h1>
        <pre style={{ 
          backgroundColor: '#fee', 
          padding: '1rem', 
          borderRadius: '4px',
          overflow: 'auto'
        }}>
          {error instanceof Error ? error.message : 'Unknown error'}
        </pre>
      </main>
    );
  }
}