import Link from 'next/link';
import { WooCommerceProduct } from '@/types/wordpress';
import { ImageContainer, Icon } from '../ui';

interface ProductCardProps {
  product: WooCommerceProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Determine product type icon based on name/category
  const getProductIcon = (product: WooCommerceProduct) => {
    const name = product.name.toLowerCase();
    const category = product.categories?.[0]?.name?.toLowerCase() || '';

    if (name.includes('sensor') || category.includes('sensor')) return 'sensor';
    if (name.includes('transmitter') || category.includes('transmitter'))
      return 'transmitter';
    if (name.includes('wireless') || name.includes('wifi')) return 'wireless';
    if (name.includes('temperature') || name.includes('temp'))
      return 'thermometer';
    if (name.includes('pressure') || name.includes('gauge')) return 'gauge';
    if (name.includes('humidity') || name.includes('rh')) return 'activity';

    return 'sensor'; // Default for general products
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow block group"
    >
      {/* Product Image */}
      {product.images && product.images[0] ? (
        <div className="mb-4">
          <ImageContainer
            src={product.images[0].src}
            alt={product.name}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            containerClassName="aspect-square relative bg-gray-100 rounded-md overflow-hidden"
          />
        </div>
      ) : (
        /* Fallback icon when no image */
        <div className="mb-4 aspect-square relative bg-gray-100 rounded-md flex items-center justify-center">
          <Icon
            name={getProductIcon(product)}
            size="2xl"
            className="text-gray-400 group-hover:text-bapi-blue transition-colors"
          />
        </div>
      )}

      {/* Product Info */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-bapi-blue transition-colors flex-1">
            {product.name}
          </h3>
          <Icon
            name={getProductIcon(product)}
            size="sm"
            className="text-gray-400 mt-1 flex-shrink-0"
          />
        </div>

        <p className="text-sm text-gray-500 flex items-center gap-1">
          <Icon name="document" size="xs" />
          SKU: {product.sku}
        </p>

        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-bapi-blue">${product.price}</p>

          {/* Stock Status with Icon */}
          <div className="flex items-center gap-1">
            <Icon
              name={product.stock_status === 'instock' ? 'success' : 'error'}
              size="xs"
              className={
                product.stock_status === 'instock'
                  ? 'text-green-500'
                  : 'text-red-500'
              }
            />
            <span
              className={`text-xs font-medium ${
                product.stock_status === 'instock'
                  ? 'text-green-700'
                  : 'text-red-700'
              }`}
            >
              {product.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>

        {/* Categories with Icon */}
        {product.categories && product.categories.length > 0 && (
          <div className="pt-2">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1 w-fit">
              <Icon name="settings" size="xs" />
              {product.categories[0].name}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
