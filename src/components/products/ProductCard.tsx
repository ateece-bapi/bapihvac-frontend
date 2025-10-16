import Image from 'next/image';
import Link from 'next/link';
import { WooCommerceProduct } from '@/types/wordpress';

interface ProductCardProps {
  product: WooCommerceProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow block group"
    >
      {/* Product Image */}
      {product.images && product.images[0] && (
        <div className="mb-4 aspect-square relative bg-gray-100 rounded-md overflow-hidden">
          <Image
            src={product.images[0].src}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-bapi-blue transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-500">
          SKU: {product.sku}
        </p>

        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-bapi-blue">
            ${product.price}
          </p>
          
          {/* Stock Status */}
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              product.stock_status === 'instock' ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <span className={`text-xs font-medium ${
              product.stock_status === 'instock' ? 'text-green-700' : 'text-red-700'
            }`}>
              {product.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>

        {/* Categories */}
        {product.categories && product.categories.length > 0 && (
          <div className="pt-2">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {product.categories[0].name}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}