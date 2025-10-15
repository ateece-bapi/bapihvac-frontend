/**
 * WordPress API Client
 * Fetches data from the WordPress REST API
 */

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
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'BAPI-Frontend/1.0',
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error: unknown) {
    // Handle specific header overflow errors
    const errorAny = error as Record<string, unknown>;
    if (errorAny?.code === 'UND_ERR_HEADERS_OVERFLOW' || 
        (typeof errorAny?.message === 'string' && errorAny.message.includes('Headers Overflow')) ||
        (errorAny?.cause as Record<string, unknown>)?.code === 'UND_ERR_HEADERS_OVERFLOW') {
      console.error('WordPress API Headers Overflow - API may be misconfigured:', error);
      throw new Error('WordPress API configuration error - headers too large');
    }
    
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

// Mock data for development when WooCommerce API is not available
function getMockProducts() {
  return [
    {
      id: 1,
      name: "Temperature Sensor - Model TS-101",
      slug: "temperature-sensor-ts-101",
      price: "129.99",
      regular_price: "129.99",
      sku: "TS-101",
      stock_status: "instock",
      images: [{
        id: 1,
        src: "https://via.placeholder.com/300x200/0066cc/ffffff?text=BAPI+Sensor",
        alt: "Temperature Sensor TS-101"
      }],
      categories: [{
        id: 1,
        name: "Temperature Sensors",
        slug: "temperature-sensors"
      }],
      short_description: "High-precision temperature sensor for HVAC applications",
      description: "Professional-grade temperature sensor designed for commercial HVAC systems."
    },
    {
      id: 2,
      name: "Humidity Sensor - Model HS-202",
      slug: "humidity-sensor-hs-202", 
      price: "149.99",
      regular_price: "149.99",
      sku: "HS-202",
      stock_status: "instock",
      images: [{
        id: 2,
        src: "https://via.placeholder.com/300x200/0066cc/ffffff?text=BAPI+Humidity",
        alt: "Humidity Sensor HS-202"
      }],
      categories: [{
        id: 2,
        name: "Humidity Sensors",
        slug: "humidity-sensors"
      }],
      short_description: "Accurate humidity monitoring for optimal climate control",
      description: "Advanced humidity sensor with digital output for precise environmental monitoring."
    },
    {
      id: 3,
      name: "Pressure Transmitter - Model PT-303",
      slug: "pressure-transmitter-pt-303",
      price: "299.99", 
      regular_price: "299.99",
      sku: "PT-303",
      stock_status: "instock",
      images: [{
        id: 3,
        src: "https://via.placeholder.com/300x200/0066cc/ffffff?text=BAPI+Pressure",
        alt: "Pressure Transmitter PT-303"
      }],
      categories: [{
        id: 3,
        name: "Pressure Sensors",
        slug: "pressure-sensors"
      }],
      short_description: "Industrial-grade pressure transmitter",
      description: "Reliable pressure measurement for critical HVAC applications."
    }
  ];
}

// WooCommerce - Get all products (with authentication)
export async function getProducts() {
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    console.warn('WooCommerce API keys not configured, returning mock data');
    // Return mock data for development
    return getMockProducts();
  }

  try {
    // Use URL parameters instead of Basic auth to avoid header issues
    const params = new URLSearchParams({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
    });

    return fetchAPI(`/wc/v3/products?${params.toString()}`);
  } catch (error) {
    console.error('WooCommerce API failed, falling back to mock data:', error);
    return getMockProducts();
  }
}

// WooCommerce - Get a single product (with authentication)
export async function getProduct(id: number) {
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    console.warn('WooCommerce API keys not configured, returning mock data');
    const mockProducts = getMockProducts();
    return mockProducts.find(p => p.id === id) || mockProducts[0];
  }

  try {
    // Use URL parameters instead of Basic auth to avoid header issues
    const params = new URLSearchParams({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
    });

    return fetchAPI(`/wc/v3/products/${id}?${params.toString()}`);
  } catch (error) {
    console.error('WooCommerce API failed, falling back to mock data:', error);
    const mockProducts = getMockProducts();
    return mockProducts.find(p => p.id === id) || mockProducts[0];
  }
}