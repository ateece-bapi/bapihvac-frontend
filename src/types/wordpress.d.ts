/**
 * TypeScript type definitions for WordPress REST API
 */

// Re-export Zod inferred types for convenience
export type { 
  WooCommerceProduct,
  WordPressPost,
  WordPressPage,
  WooCommerceProductImage,
  WooCommerceProductCategory,
  WooCommerceProductTag,
  WooCommerceProductAttribute,
  WooCommerceProductVariation,
  WooCommerceProductMetaData
} from './schemas';

export interface WordPressPage {
  id: number;
  date: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  parent: number;
  featured_media: number;
}

export interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  type: string;
  status: string;
  featured: boolean;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  images: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  stock_status: string;
  stock_quantity: number | null;
}