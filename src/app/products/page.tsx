import { getProducts } from '@/lib/wordpress';

export default async function ProductsPage() {
  try {
    const products = await getProducts();

    return (
      <main className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-bapi-blue mb-4">BAPI HVAC Products</h1>
          <p className="text-gray-600">Found {products.length} products</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <a
              key={product.id}
              href={`/products/${product.slug}`}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow block"
            >
              {product.images && product.images[0] && (
                <div className="mb-4">
                  <img 
                    src={product.images[0].src} 
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
              )}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                <p className="text-lg font-bold text-bapi-blue">
                  ${product.price}
                </p>
              </div>
            </a>
          ))}
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Products</h1>
        <pre className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md overflow-auto text-sm">
          {error instanceof Error ? error.message : 'Unknown error'}
        </pre>
      </main>
    );
  }
}