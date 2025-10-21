import React from 'react';
import { WooCommerceProduct } from '@/types/schemas';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: WooCommerceProduct[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return <div className="text-gray-500">No products found.</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
