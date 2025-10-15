/**
 * WordPress API Client
 * Fetches data from the WordPress REST API
 */

const WORDPRESS_API_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  'https://www.bapihvac.com/wp-json';

export async function fetchAPI(endpoint: string, options = {}) {
  const url = `${WORDPRESS_API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('WordPress API Error:', error);
    throw error;
  }
}

// Get all posts
export async function getPosts() {
  return fetchAPI('/wp/v2/posts');
}

// Get a single post by slug
export async function getPostBySlug(slug: string) {
  const posts = await fetchAPI(`/wp/v2/posts?slug=${slug}`);
  return posts[0];
}

// Get all pages
export async function getPages() {
  return fetchAPI('/wp/v2/pages');
}

// Get a single page by slug
export async function getPageBySlug(slug: string) {
  const pages = await fetchAPI(`/wp/v2/pages?slug=${slug}`);
  return pages[0];
}

// WooCommerce - Get all products
export async function getProducts() {
  return fetchAPI('/wc/v3/products');
}

// WooCommerce - Get a single product
export async function getProduct(id: number) {
  return fetchAPI(`/wc/v3/products/${id}`);
}