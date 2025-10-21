import { getProducts } from '@/lib/wpapi';
import { notFound } from 'next/navigation';
import { ProductDetails, ProductDescription } from '@/components/products';
import { ErrorDisplay, BackLink } from '@/components/ui';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// TODO: Remove 'any' once Next.js/TypeScript type conflict is resolved. See build history for details.
export default async function ProductPage(props: any) {
  const { params } = props;
  try {
    // Destructure params directly (do not await)
    const { slug } = params;
    let products = await getProducts();
    // Ensure stock_quantity is always number|null, never undefined
    products = products.map((p) => ({
      ...p,
      stock_quantity: p.stock_quantity ?? null,
    }));
    const product = products.find((p) => p.slug === slug);

    if (!product) {
      notFound();
    }

    return (
      <main className="max-w-7xl mx-auto p-8">
        <ProductDetails product={product} />
        <ProductDescription description={product.description} />
        <BackLink href="/products">Back to Products</BackLink>
      </main>
    );
  } catch (error) {
    return (
      <ErrorDisplay
        title="Error Loading Product"
        message={error instanceof Error ? error.message : 'Unknown error'}
      />
    );
  }
}

// Generate static params for all products
export async function generateStaticParams() {
  try {
    let products = await getProducts();
    // Ensure stock_quantity is always number|null, never undefined
    products = products.map((p) => ({
      ...p,
      stock_quantity: p.stock_quantity ?? null,
    }));
    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
