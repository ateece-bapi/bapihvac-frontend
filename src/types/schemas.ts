// WordPress Media/Attachment Schema
export const WordPressMediaSchema = z.object({
  id: z.number(),
  date: z.string(),
  date_gmt: z.string(),
  guid: z.object({ rendered: z.string() }),
  modified: z.string(),
  modified_gmt: z.string(),
  slug: z.string(),
  status: z.string(),
  type: z.string(),
  link: z.string(),
  title: z.object({ rendered: z.string() }),
  author: z.number(),
  comment_status: z.string(),
  ping_status: z.string(),
  template: z.string().optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
  description: z.object({ rendered: z.string() }),
  caption: z.object({ rendered: z.string() }),
  alt_text: z.string(),
  media_type: z.string(),
  mime_type: z.string(),
  media_details: z.record(z.string(), z.unknown()),
  post: z.number().nullable().optional(),
  source_url: z.string(),
  _links: z.record(z.string(), z.unknown()),
});

export const WordPressMediaArraySchema = z.array(WordPressMediaSchema);
export type WordPressMedia = z.infer<typeof WordPressMediaSchema>;

// WordPress User/Author Schema
export const WordPressUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string(),
  description: z.string(),
  link: z.string(),
  slug: z.string(),
  avatar_urls: z.record(z.string(), z.string()),
  meta: z.record(z.string(), z.unknown()).optional(),
  acf: z.unknown().optional(),
  yoast_head_json: z.unknown().optional(),
  is_super_admin: z.boolean().optional(),
  _links: z.record(z.string(), z.unknown()),
});

export const WordPressUserArraySchema = z.array(WordPressUserSchema);
export type WordPressUser = z.infer<typeof WordPressUserSchema>;

// WordPress Taxonomy (Category/Tag) Schema
export const WordPressTaxonomySchema = z.object({
  id: z.number(),
  count: z.number(),
  description: z.string(),
  link: z.string(),
  name: z.string(),
  slug: z.string(),
  taxonomy: z.string(),
  parent: z.number().optional(),
  meta: z.array(z.unknown()).optional(),
  acf: z.unknown().optional(),
  yoast_head: z.string().optional(),
  yoast_head_json: z.unknown().optional(),
  _links: z.record(z.string(), z.unknown()),
});

export const WordPressTaxonomyArraySchema = z.array(WordPressTaxonomySchema);
export type WordPressTaxonomy = z.infer<typeof WordPressTaxonomySchema>;

// WordPress Comment Schema
export const WordPressCommentSchema = z.object({
  id: z.number(),
  post: z.number(),
  parent: z.number(),
  author: z.number(),
  author_name: z.string(),
  author_email: z.string(),
  date: z.string(),
  date_gmt: z.string(),
  content: z.object({ rendered: z.string() }),
  link: z.string(),
  status: z.string(),
  type: z.string(),
  author_url: z.string().optional(),
  author_ip: z.string().optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
  _links: z.record(z.string(), z.unknown()),
});

export const WordPressCommentArraySchema = z.array(WordPressCommentSchema);
export type WordPressComment = z.infer<typeof WordPressCommentSchema>;
import { z } from 'zod';

/**
 * Zod schemas for WordPress REST API types
 * Provides runtime validation and type inference
 */

// Base WordPress content structure
const WordPressContent = z.object({
  rendered: z.string(),
  protected: z.boolean().optional(),
});

const WordPressTitle = z.object({
  rendered: z.string(),
});

// WordPress Post Schema
export const WordPressPostSchema = z.object({
  id: z.number(),
  date: z.string(),
  date_gmt: z.string().optional(),
  guid: z.object({
    rendered: z.string(),
  }).optional(),
  modified: z.string().optional(),
  modified_gmt: z.string().optional(),
  slug: z.string(),
  status: z.enum(['publish', 'future', 'draft', 'pending', 'private']),
  type: z.string().default('post'),
  link: z.string().url(),
  title: WordPressTitle,
  content: WordPressContent,
  excerpt: WordPressContent,
  author: z.number(),
  featured_media: z.number(),
  comment_status: z.enum(['open', 'closed']).optional(),
  ping_status: z.enum(['open', 'closed']).optional(),
  sticky: z.boolean().optional(),
  template: z.string().optional(),
  format: z.string().optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
  categories: z.array(z.number()).default([]),
  tags: z.array(z.number()).default([]),
});

// WordPress Page Schema
export const WordPressPageSchema = z.object({
  id: z.number(),
  date: z.string(),
  date_gmt: z.string().optional(),
  guid: z.object({
    rendered: z.string(),
  }).optional(),
  modified: z.string().optional(),
  modified_gmt: z.string().optional(),
  slug: z.string(),
  status: z.enum(['publish', 'future', 'draft', 'pending', 'private']),
  type: z.string().default('page'),
  link: z.string().url(),
  title: WordPressTitle,
  content: WordPressContent,
  author: z.number(),
  featured_media: z.number(),
  parent: z.number().default(0),
  menu_order: z.number().optional(),
  comment_status: z.enum(['open', 'closed']).optional(),
  ping_status: z.enum(['open', 'closed']).optional(),
  template: z.string().optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
});

// WooCommerce Product Image Schema
const ProductImageSchema = z.object({
  id: z.number(),
  date_created: z.string().optional(),
  date_created_gmt: z.string().optional(),
  date_modified: z.string().optional(),
  date_modified_gmt: z.string().optional(),
  src: z.string().url(),
  name: z.string().optional(),
  alt: z.string().default(''),
});

// WooCommerce Product Category Schema
const ProductCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
});

// WooCommerce Product Tag Schema
const ProductTagSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
});

// WooCommerce Product Attribute Schema
const ProductAttributeSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  position: z.number().optional(),
  visible: z.boolean().optional(),
  variation: z.boolean().optional(),
  options: z.array(z.string()).default([]),
});

// WooCommerce Product Dimensions Schema
const ProductDimensionsSchema = z.object({
  length: z.string().default(''),
  width: z.string().default(''),
  height: z.string().default(''),
});

// Main WooCommerce Product Schema
export const WooCommerceProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  permalink: z.string().url(),
  date_created: z.string(),
  date_created_gmt: z.string().optional(),
  date_modified: z.string().optional(),
  date_modified_gmt: z.string().optional(),
  type: z.enum(['simple', 'grouped', 'external', 'variable']).default('simple'),
  status: z.enum(['draft', 'pending', 'private', 'publish']).default('publish'),
  featured: z.boolean().default(false),
  catalog_visibility: z.enum(['visible', 'catalog', 'search', 'hidden']).default('visible'),
  description: z.string().default(''),
  short_description: z.string().default(''),
  sku: z.string().default(''),
  price: z.string().default('0'),
  regular_price: z.string().default('0'),
  sale_price: z.string().default(''),
  date_on_sale_from: z.string().nullable().optional(),
  date_on_sale_from_gmt: z.string().nullable().optional(),
  date_on_sale_to: z.string().nullable().optional(),
  date_on_sale_to_gmt: z.string().nullable().optional(),
  price_html: z.string().default(''),
  on_sale: z.boolean().default(false),
  purchasable: z.boolean().default(true),
  total_sales: z.number().default(0),
  virtual: z.boolean().default(false),
  downloadable: z.boolean().default(false),
  external_url: z.string().default(''),
  button_text: z.string().default(''),
  tax_status: z.enum(['taxable', 'shipping', 'none']).default('taxable'),
  tax_class: z.string().default(''),
  manage_stock: z.boolean().default(false),
  stock_quantity: z.number().nullable().optional(),
  stock_status: z.enum(['instock', 'outofstock', 'onbackorder']).default('instock'),
  backorders: z.enum(['no', 'notify', 'yes']).default('no'),
  backorders_allowed: z.boolean().default(false),
  backordered: z.boolean().default(false),
  sold_individually: z.boolean().default(false),
  weight: z.string().default(''),
  dimensions: ProductDimensionsSchema.optional(),
  shipping_required: z.boolean().default(true),
  shipping_taxable: z.boolean().default(true),
  shipping_class: z.string().default(''),
  shipping_class_id: z.number().default(0),
  reviews_allowed: z.boolean().default(true),
  average_rating: z.string().default('0'),
  rating_count: z.number().default(0),
  related_ids: z.array(z.number()).default([]),
  upsell_ids: z.array(z.number()).default([]),
  cross_sell_ids: z.array(z.number()).default([]),
  parent_id: z.number().default(0),
  purchase_note: z.string().default(''),
  categories: z.array(ProductCategorySchema).default([]),
  tags: z.array(ProductTagSchema).default([]),
  images: z.array(ProductImageSchema).default([]),
  attributes: z.array(ProductAttributeSchema).default([]),
  default_attributes: z.array(z.object({
    id: z.number(),
    name: z.string(),
    option: z.string(),
  })).default([]),
  variations: z.array(z.number()).default([]),
  grouped_products: z.array(z.number()).default([]),
  menu_order: z.number().default(0),
  meta_data: z.array(z.object({
    id: z.number(),
    key: z.string(),
    value: z.unknown(),
  })).default([]),
});

// Array schemas for API responses
export const WordPressPostsSchema = z.array(WordPressPostSchema);
export const WordPressPagesSchema = z.array(WordPressPageSchema);
export const WooCommerceProductsSchema = z.array(WooCommerceProductSchema);

// Inferred TypeScript types
export type WordPressPost = z.infer<typeof WordPressPostSchema>;
export type WordPressPage = z.infer<typeof WordPressPageSchema>;
export type WooCommerceProduct = z.infer<typeof WooCommerceProductSchema>;
export type ProductImage = z.infer<typeof ProductImageSchema>;
export type ProductCategory = z.infer<typeof ProductCategorySchema>;
export type ProductTag = z.infer<typeof ProductTagSchema>;

// Environment Variables Schema
export const EnvSchema = z.object({
  NEXT_PUBLIC_WORDPRESS_API_URL: z.string().url().default('https://www.bapihvac.com/wp-json'),
  WORDPRESS_API_URL: z.string().url().default('https://www.bapihvac.com/wp-json'),
  WOOCOMMERCE_CONSUMER_KEY: z.string().optional(),
  WOOCOMMERCE_CONSUMER_SECRET: z.string().optional(),
  WORDPRESS_AUTH_USERNAME: z.string().optional(),
  WORDPRESS_AUTH_PASSWORD: z.string().optional(),
  NEXTAUTH_SECRET: z.string().optional(),
  NEXTAUTH_URL: z.string().url().optional(),
});

export type EnvConfig = z.infer<typeof EnvSchema>;