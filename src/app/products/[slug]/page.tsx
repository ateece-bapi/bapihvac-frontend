import { getProduct, getProducts } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    // Get all products first, then find by slug
    const products = await getProducts();
    const product = products.find((p: any) => p.slug === params.slug);

    if (!product) {
      notFound();
    }

    return (
      <main className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            {product.images && product.images[0] && (
              <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.images[0].src}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            {/* Additional Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1, 5).map((image: any, index: number) => (
                  <div key={index} className="aspect-square relative bg-gray-100 rounded-md overflow-hidden">
                    <Image
                      src={image.src}
                      alt={`${product.name} ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600">SKU: {product.sku}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-bapi-blue">${product.price}</span>
              {product.regular_price && product.regular_price !== product.price && (
                <span className="text-xl text-gray-500 line-through">${product.regular_price}</span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                product.stock_status === 'instock' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className={`text-sm font-medium ${
                product.stock_status === 'instock' ? 'text-green-700' : 'text-red-700'
              }`}>
                {product.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Short Description */}
            {product.short_description && (
              <div className="prose prose-gray">
                <div 
                  dangerouslySetInnerHTML={{ __html: product.short_description }}
                  className="text-gray-700"
                />
              </div>
            )}

            {/* Categories */}
            {product.categories && product.categories.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {product.categories.map((category: any) => (
                    <span
                      key={category.id}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <div className="flex space-x-4">
              <button 
                className="flex-1 bg-bapi-blue text-white px-6 py-3 rounded-md font-medium hover:bg-bapi-blue-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={product.stock_status !== 'instock'}
              >
                {product.stock_status === 'instock' ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors">
                Request Quote
              </button>
            </div>
          </div>
        </div>

        {/* Full Description */}
        {product.description && (
          <div className="mt-16 border-t pt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h2>
            <div 
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        )}

        {/* Back to Products */}
        <div className="mt-12">
          <a 
            href="/products"
            className="inline-flex items-center text-bapi-blue hover:text-bapi-blue-dark"
          >
            ← Back to Products
          </a>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Product</h1>
        <pre className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md overflow-auto text-sm">
          {error instanceof Error ? error.message : 'Unknown error'}
        </pre>
      </main>
    );
  }
}

// Generate static params for all products
export async function generateStaticParams() {
  try {
    const products = await getProducts();
    return products.map((product: any) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}