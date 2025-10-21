/**
 * WordPress API Client with Zod Validation
 * Fetches data from the WordPress REST API with runtime validation
 */

import {
  WordPressPostsSchema,
  WordPressPagesSchema,
  WooCommerceProductSchema,
  WooCommerceProductsSchema,
  WordPressMediaArraySchema,
  WordPressUserArraySchema,
  WordPressTaxonomyArraySchema,
  WordPressCommentArraySchema,
  type WordPressPost,
  type WooCommerceProduct,
  type WordPressMedia,
  type WordPressUser,
  type WordPressTaxonomy,
  type WordPressComment,
} from '@/types/schemas';

// Fetch and validate WordPress media/attachments
export async function getMedia(): Promise<WordPressMedia[]> {
  const data = await fetchAPI('/wp/v2/media');
  const result = WordPressMediaArraySchema.safeParse(data);
  if (!result.success) {
    console.error('WordPress Media validation failed:', result.error.issues);
    throw new Error('Invalid media data received from WordPress API');
  }
  return result.data;
}

// Fetch and validate WordPress users/authors
export async function getUsers(): Promise<WordPressUser[]> {
  const data = await fetchAPI('/wp/v2/users');
  const result = WordPressUserArraySchema.safeParse(data);
  if (!result.success) {
    console.error('WordPress Users validation failed:', result.error.issues);
    throw new Error('Invalid users data received from WordPress API');
  }
  return result.data;
}

// Fetch and validate WordPress categories (taxonomy)
export async function getCategories(): Promise<WordPressTaxonomy[]> {
  const data = await fetchAPI('/wp/v2/categories');
  const result = WordPressTaxonomyArraySchema.safeParse(data);
  if (!result.success) {
    console.error(
      'WordPress Categories validation failed:',
      result.error.issues
    );
    throw new Error('Invalid categories data received from WordPress API');
  }
  return result.data;
}

// Fetch and validate WordPress tags (taxonomy)
export async function getTags(): Promise<WordPressTaxonomy[]> {
  const data = await fetchAPI('/wp/v2/tags');
  const result = WordPressTaxonomyArraySchema.safeParse(data);
  if (!result.success) {
    console.error('WordPress Tags validation failed:', result.error.issues);
    throw new Error('Invalid tags data received from WordPress API');
  }
  return result.data;
}

// Fetch and validate WordPress comments
export async function getComments(): Promise<WordPressComment[]> {
  const data = await fetchAPI('/wp/v2/comments');
  const result = WordPressCommentArraySchema.safeParse(data);
  if (!result.success) {
    console.error('WordPress Comments validation failed:', result.error.issues);
    throw new Error('Invalid comments data received from WordPress API');
  }
  return result.data;
}

const WORDPRESS_API_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  'https://www.bapihvac.com/wp-json';

interface FetchOptions {
  headers?: Record<string, string>;
  [key: string]: unknown;
}

export async function fetchAPI(endpoint: string, options: FetchOptions = {}) {
  const url = `${WORDPRESS_API_URL}${endpoint}`;

  try {
    // Only include minimal headers to prevent overflow errors
    const minimalHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    // Log headers for debugging
    console.log('[WordPress API] fetch headers:', minimalHeaders);
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers: minimalHeaders,
      // Prevent cookies from being sent
      credentials: 'omit',
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    // Enhanced error logging for debugging
    console.error('[WordPress API] fetch failed:', {
      url,
      options,
      error,
      errorString: error instanceof Error ? error.toString() : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
      env: {
        WOOCOMMERCE_CONSUMER_KEY: process.env.WOOCOMMERCE_CONSUMER_KEY,
        WOOCOMMERCE_CONSUMER_SECRET: process.env.WOOCOMMERCE_CONSUMER_SECRET,
        WORDPRESS_PRODUCT_CATEGORY_ID:
          process.env.WORDPRESS_PRODUCT_CATEGORY_ID,
      },
    });
    // Handle specific header overflow errors
    const errorAny = error as Record<string, unknown>;
    if (
      errorAny?.code === 'UND_ERR_HEADERS_OVERFLOW' ||
      (typeof errorAny?.message === 'string' &&
        errorAny.message.includes('Headers Overflow')) ||
      (errorAny?.cause as Record<string, unknown>)?.code ===
        'UND_ERR_HEADERS_OVERFLOW'
    ) {
      console.error(
        'WordPress API Headers Overflow - API may be misconfigured:',
        error
      );
      throw new Error('WordPress API configuration error - headers too large');
    }

    console.error('WordPress API Error:', error);
    throw error;
  }
}

export async function getPosts(): Promise<WordPressPost[]> {
  const data = await fetchAPI('/wp/v2/posts');
  const result = WordPressPostsSchema.safeParse(data);
  if (!result.success) {
    console.error('WordPress Posts validation failed:', result.error.issues);
    throw new Error('Invalid posts data received from WordPress API');
  }
  return result.data;
}

export async function getPostBySlug(
  slug: string
): Promise<WordPressPost | null> {
  const data = await fetchAPI(`/wp/v2/posts?slug=${slug}`);
  const result = WordPressPostsSchema.safeParse(data);
  if (!result.success) {
    console.error('WordPress Post validation failed:', result.error.issues);
    throw new Error('Invalid post data received from WordPress API');
  }
  return result.data[0] || null;
}

export async function getPages() {
  const data = await fetchAPI('/wp/v2/pages');
  const result = WordPressPagesSchema.safeParse(data);
  if (!result.success) {
    console.error('WordPress Pages validation failed:', result.error.issues);
    throw new Error('Invalid pages data received from WordPress API');
  }
  return result.data;
}

export async function getPageBySlug(slug: string) {
  const data = await fetchAPI(`/wp/v2/pages?slug=${slug}`);
  const result = WordPressPagesSchema.safeParse(data);
  if (!result.success) {
    console.error('WordPress Page validation failed:', result.error.issues);
    throw new Error('Invalid page data received from WordPress API');
  }
  return result.data[0] || null;
}

function getMockProducts(): WooCommerceProduct[] {
  const mockData = [
    {
      id: 1,
      name: 'Temperature Sensor - Model TS-101',
      slug: 'temperature-sensor-ts-101',
      permalink: 'https://www.bapihvac.com/products/temperature-sensor-ts-101',
      date_created: '2025-01-01T00:00:00',
      type: 'simple' as const,
      status: 'publish' as const,
      featured: false,
      catalog_visibility: 'visible' as const,
      description:
        'Professional-grade temperature sensor designed for commercial HVAC systems.',
      short_description:
        'High-precision temperature sensor for HVAC applications',
      sku: 'TS-101',
      price: '129.99',
      regular_price: '129.99',
      sale_price: '',
      price_html: '$129.99',
      on_sale: false,
      purchasable: true,
      total_sales: 0,
      virtual: false,
      downloadable: false,
      external_url: '',
      button_text: '',
      tax_status: 'taxable' as const,
      tax_class: '',
      manage_stock: false,
      stock_quantity: null,
      stock_status: 'instock' as const,
      backorders: 'no' as const,
      backorders_allowed: false,
      backordered: false,
      sold_individually: false,
      weight: '',
      shipping_required: true,
      shipping_taxable: true,
      shipping_class: '',
      shipping_class_id: 0,
      reviews_allowed: true,
      average_rating: '0',
      rating_count: 0,
      related_ids: [],
      upsell_ids: [],
      cross_sell_ids: [],
      parent_id: 0,
      purchase_note: '',
      categories: [
        {
          id: 2,
          name: 'Humidity Sensors',
          slug: 'humidity-sensors',
        },
      ],
      tags: [],
      images: [
        {
          id: 2,
          src: 'https://placehold.co/300x200/0066cc/ffffff?text=BAPI+Humidity',
          alt: 'Humidity Sensor HS-202',
        },
      ],
      attributes: [],
      default_attributes: [],
      variations: [],
      grouped_products: [],
      menu_order: 0,
      meta_data: [],
    },
    {
      id: 3,
      name: 'Pressure Transmitter - Model PT-303',
      slug: 'pressure-transmitter-pt-303',
      permalink:
        'https://www.bapihvac.com/products/pressure-transmitter-pt-303',
      date_created: '2025-01-01T00:00:00',
      type: 'simple' as const,
      status: 'publish' as const,
      featured: false,
      catalog_visibility: 'visible' as const,
      description:
        'Reliable pressure measurement for critical HVAC applications.',
      short_description: 'Industrial-grade pressure transmitter',
      sku: 'PT-303',
      price: '299.99',
      regular_price: '299.99',
      sale_price: '',
      price_html: '$299.99',
      on_sale: false,
      purchasable: true,
      total_sales: 0,
      virtual: false,
      downloadable: false,
      external_url: '',
      button_text: '',
      tax_status: 'taxable' as const,
      tax_class: '',
      manage_stock: false,
      stock_quantity: null,
      stock_status: 'instock' as const,
      backorders: 'no' as const,
      backorders_allowed: false,
      backordered: false,
      sold_individually: false,
      weight: '',
      shipping_required: true,
      shipping_taxable: true,
      shipping_class: '',
      shipping_class_id: 0,
      reviews_allowed: true,
      average_rating: '0',
      rating_count: 0,
      related_ids: [],
      upsell_ids: [],
      cross_sell_ids: [],
      parent_id: 0,
      purchase_note: '',
      categories: [
        {
          id: 3,
          name: 'Pressure Sensors',
          slug: 'pressure-sensors',
        },
      ],
      tags: [],
      images: [
        {
          id: 3,
          src: 'https://placehold.co/300x200/0066cc/ffffff?text=BAPI+Pressure',
          alt: 'Pressure Transmitter PT-303',
        },
      ],
      attributes: [],
      default_attributes: [],
      variations: [],
      grouped_products: [],
      menu_order: 0,
      meta_data: [],
    },
  ];

  // Validate mock data
  const result = WooCommerceProductsSchema.safeParse(mockData);
  if (!result.success) {
    console.error('Mock products validation failed:', result.error.issues);
    throw new Error('Invalid mock product data');
  }
  return result.data;
}

function convertPostsToProducts(posts: unknown[]): WooCommerceProduct[] {
  const convertedProducts = posts.map((postData, index) => {
    const post = postData as {
      id?: number;
      title?: { rendered?: string };
      slug?: string;
      link?: string;
      date?: string;
      date_gmt?: string;
      modified?: string;
      modified_gmt?: string;
      content?: { rendered?: string };
      excerpt?: { rendered?: string };
    };
    const product = {
      id: post.id || index + 1,
      name: post.title?.rendered || `Product ${index + 1}`,
      slug: post.slug || `product-${index + 1}`,
      permalink:
        post.link || `https://bapihvac.com/product/${post.slug || index + 1}`,
      date_created: post.date || new Date().toISOString(),
      date_created_gmt: post.date_gmt || new Date().toISOString(),
      date_modified: post.modified || new Date().toISOString(),
      date_modified_gmt: post.modified_gmt || new Date().toISOString(),
      type: 'simple' as const,
      status: 'publish' as const,
      featured: false,
      catalog_visibility: 'visible' as const,
      description: post.content?.rendered || '',
      short_description: post.excerpt?.rendered || '',
      sku: `SKU-${post.id || index + 1}`,
      price: '0.00',
      regular_price: '0.00',
      sale_price: '',
      date_on_sale_from: null,
      date_on_sale_from_gmt: null,
      date_on_sale_to: null,
      date_on_sale_to_gmt: null,
      on_sale: false,
      purchasable: true,
      total_sales: 0,
      virtual: false,
      downloadable: false,
      download_limit: -1,
      download_expiry: -1,
      external_url: '',
      button_text: '',
      tax_status: 'taxable' as const,
      tax_class: '',
      manage_stock: false,
      stock_quantity: null,
      backorders: 'no' as const,
      backorders_allowed: false,
      backordered: false,
      low_stock_amount: null,
      sold_individually: false,
      weight: '',
      shipping_required: true,
      shipping_taxable: true,
      shipping_class: '',
      shipping_class_id: 0,
      reviews_allowed: true,
      average_rating: '0.00',
      rating_count: 0,
      upsell_ids: [],
      cross_sell_ids: [],
      parent_id: 0,
      purchase_note: '',
      categories: [],
      tags: [],
      images: [],
      attributes: [],
      default_attributes: [],
      variations: [],
      grouped_products: [],
      menu_order: 0,
      price_html: '',
      related_ids: [],
      meta_data: [],
      stock_status: 'instock' as const,
      has_options: false,
      post_password: '',
      global_unique_id: '',
    };
    const result = WooCommerceProductSchema.safeParse(product);
    if (result.success) {
      return result.data;
    } else {
      console.warn(
        `Product conversion validation failed for post ${post.id || index}:`,
        result.error.issues
      );
      return getMockProducts()[0];
    }
  });
  return convertedProducts;
}

export async function getProducts(): Promise<WooCommerceProduct[]> {
  const useMock = process.env.USE_MOCK_PRODUCTS === 'true';
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;
  if (useMock) {
    console.warn('USE_MOCK_PRODUCTS is true, returning mock data');
    return getMockProducts();
  }
  if (!consumerKey || !consumerSecret) {
    console.warn('WooCommerce API keys not configured, returning mock data');
    return getMockProducts();
  }
  try {
    const params = new URLSearchParams({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      per_page: '10',
    });
    const data = await fetchAPI(`/wc/v3/products?${params.toString()}`);
    const result = WooCommerceProductsSchema.safeParse(data);
    if (!result.success) {
      console.warn(
        'WooCommerce Products validation failed:',
        result.error.issues
      );
      console.warn('Falling back to mock data due to validation errors');
      return getMockProducts();
    }
    return result.data;
  } catch (error) {
    console.warn(
      'WooCommerce API failed, trying WordPress posts as fallback:',
      error
    );
    try {
      const PRODUCT_CATEGORY_ID =
        process.env.WORDPRESS_PRODUCT_CATEGORY_ID || '123';
      const posts = await fetchAPI(
        `/wp/v2/posts?categories=${PRODUCT_CATEGORY_ID}&per_page=10`
      );
      return convertPostsToProducts(posts);
    } catch (fallbackError) {
      console.error('All API attempts failed, using mock data:', fallbackError);
      return getMockProducts();
    }
  }
}

export async function getProduct(
  id: number
): Promise<WooCommerceProduct | null> {
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;
  if (!consumerKey || !consumerSecret) {
    console.warn('WooCommerce API keys not configured, returning mock data');
    const mockProducts = getMockProducts();
    return mockProducts.find((p) => p.id === id) || mockProducts[0] || null;
  }
  try {
    const params = new URLSearchParams({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
    });
    const data = await fetchAPI(`/wc/v3/products/${id}?${params.toString()}`);
    const result = WooCommerceProductSchema.safeParse(data);
    if (!result.success) {
      console.warn(
        'WooCommerce Product validation failed:',
        result.error.issues
      );
      const mockProducts = getMockProducts();
      return mockProducts.find((p) => p.id === id) || mockProducts[0] || null;
    }
    return result.data;
  } catch (error) {
    console.error('WooCommerce API failed, falling back to mock data:', error);
    const mockProducts = getMockProducts();
    return mockProducts.find((p) => p.id === id) || mockProducts[0] || null;
  }
}

export async function getProductBySlug(
  slug: string
): Promise<WooCommerceProduct | null> {
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;
  if (!consumerKey || !consumerSecret) {
    console.warn('WooCommerce API keys not configured, searching mock data');
    const mockProducts = getMockProducts();
    return mockProducts.find((product) => product.slug === slug) || null;
  }
  try {
    const params = new URLSearchParams({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      slug: slug,
    });
    const data = await fetchAPI(`/wc/v3/products?${params.toString()}`);
    const result = WooCommerceProductsSchema.safeParse(data);
    if (!result.success) {
      console.warn(
        'WooCommerce Product validation failed:',
        result.error.issues
      );
      const mockProducts = getMockProducts();
      return mockProducts.find((product) => product.slug === slug) || null;
    }
    return result.data[0] || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    const mockProducts = getMockProducts();
    return mockProducts.find((product) => product.slug === slug) || null;
  }
}
