'use client';
'use client';

import { getProducts } from '@/lib/wpapi';
import { ProductGrid } from '@/components/products';

import React, { useEffect, useState, useMemo } from 'react';
import { ErrorDisplay } from '@/components/ui';
import { ProductFilterSidebar } from '@/components/filters/ProductFilterSidebar';
import { useProductFilterStore } from '@/lib/zustand/productFilterStore';
import type {
  WooCommerceProduct,
  WooCommerceProductCategory,
} from '@/types/wordpress';

export default function ProductsPage() {
  const [products, setProducts] = useState<WooCommerceProduct[]>([]);
  const [categories, setCategories] = useState<WooCommerceProductCategory[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  const selectedCategoryIds = useProductFilterStore(
    (s) => s.selectedCategoryIds
  );
  const setSelectedCategoryIds = useProductFilterStore(
    (s) => s.setSelectedCategoryIds
  );

  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        const plainProducts = JSON.parse(JSON.stringify(data));
        setProducts(plainProducts);

        // Extract unique categories from products
        const categoryMap = new Map<string, WooCommerceProductCategory>();
        plainProducts.forEach((product: WooCommerceProduct) => {
          product.categories?.forEach((cat: WooCommerceProductCategory) => {
            if (cat && cat.id && cat.name) {
              categoryMap.set(String(cat.id), {
                id: cat.id,
                name: cat.name,
                slug: cat.slug,
              });
            }
          });
        });
        setCategories(Array.from(categoryMap.values()));
      } catch (err: unknown) {
        if (typeof err === 'object' && err !== null && 'message' in err) {
          setError(String((err as { message?: string }).message));
        } else {
          setError('Unknown error');
        }
      }
    })();
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategoryIds.length === 0) return products;
    return products.filter((product) =>
      product.categories?.some((cat) =>
        selectedCategoryIds.includes(String(cat.id))
      )
    );
  }, [products, selectedCategoryIds]);

  if (error) {
    return <ErrorDisplay title="Error Loading Products" message={error} />;
  }

  return (
    <main className="max-w-7xl mx-auto p-8 flex gap-8">
      <div className="hidden md:block">
        <ProductFilterSidebar
          categories={categories}
          selectedCategoryIds={selectedCategoryIds}
          onCategoryChange={setSelectedCategoryIds}
        />
      </div>
      <div className="flex-1">
        <ProductGrid
          products={filteredProducts}
          title="BAPI HVAC Products"
          showCount={true}
        />
      </div>
    </main>
  );
  // ...existing code...
}
