import Image from 'next/image';
import { WooCommerceProduct } from '@/types/wordpress';
import { Button } from '../ui';

interface ProductDetailsProps {
  product: WooCommerceProduct;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        {/* Main Image */}
        {product.images && product.images[0] && (
          <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.images[0].src}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        
        {/* Image Gallery */}
        {product.images && product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {product.images.slice(1, 5).map((image, index) => (
              <div key={index} className="aspect-square relative bg-gray-100 rounded-md overflow-hidden">
                <Image
                  src={image.src}
                  alt={`${product.name} ${index + 2}`}
                  fill
                  className="object-cover hover:opacity-80 transition-opacity cursor-pointer"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        {/* Title and SKU */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-lg text-gray-600">SKU: {product.sku}</p>
        </div>

        {/* Pricing */}
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
            {product.stock_quantity && product.stock_quantity > 0 && (
              <span className="ml-1">({product.stock_quantity} available)</span>
            )}
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
              {product.categories.map((category) => (
                <span
                  key={category.id}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button 
            variant={product.stock_status === 'instock' ? 'primary' : 'disabled'}
            disabled={product.stock_status !== 'instock'}
            className="flex-1"
          >
            {product.stock_status === 'instock' ? 'Add to Cart' : 'Out of Stock'}
          </Button>
          <Button variant="outline">
            Request Quote
          </Button>
        </div>
      </div>
    </div>
  );
}