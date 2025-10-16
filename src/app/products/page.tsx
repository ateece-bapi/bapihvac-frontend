import { getProducts } from '@/lib/wordpress';
import { ProductGrid } from '@/components/products';
import { ErrorDisplay } from '@/components/ui';

export default async function ProductsPage() {
  try {
    const products = await getProducts();

    return (
      <main className="max-w-7xl mx-auto p-8">
        <ProductGrid 
          products={products} 
          title="BAPI HVAC Products"
          showCount={true}
        />
      </main>
    );
  } catch (error) {
    return (
      <ErrorDisplay 
        title="Error Loading Products"
        message={error instanceof Error ? error.message : 'Unknown error'}
      />
    );
  }
}