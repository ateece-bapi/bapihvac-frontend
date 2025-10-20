import { getProducts } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import { ProductDetails, ProductDescription } from '@/components/products';
import { ErrorDisplay, BackLink } from '@/components/ui';
import { WooCommerceProduct } from '@/types/wordpress';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    // Next.js 15+ requires awaiting params for dynamic routes
    const { slug } = await params;
    const products = await getProducts();
    const product = products.find((p: WooCommerceProduct) => p.slug === slug);

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
    const products = await getProducts();
    return products.map((product: WooCommerceProduct) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}