# BAPI HVAC Frontend

**Next.js 15 + TypeScript Headless WordPress & WooCommerce Frontend**

Modern frontend for [bapihvac.com](https://www.bapihvac.com/), built with Next.js and TypeScript, consuming data from the WordPress backend.
Now supports WooCommerce product integration, category filtering, and mock/live data toggling for robust development and testing.

## 🔗 Related Repositories

- **WordPress Backend**: [ateece-bapi/bapihvac-wordpress](https://github.com/ateece-bapi/bapihvac-wordpress)

## 🚀 Quick Start

````bash

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your WordPress API credentials

# Required .env.local variables:
#
# WOOCOMMERCE_CONSUMER_KEY=your_key
# WOOCOMMERCE_CONSUMER_SECRET=your_secret
# WORDPRESS_PRODUCT_CATEGORY_ID=your_category_id
# USE_MOCK_PRODUCTS=true|false
# NEXT_PUBLIC_WORDPRESS_API_URL=https://www.bapihvac.com/wp-json

# To find your WooCommerce product category ID:
# - Log in to WordPress admin > Products > Categories
# - Click a category and note the number in the URL (e.g. ...edit&category=302)

# USE_MOCK_PRODUCTS=true will use local mock data for development/testing.
# USE_MOCK_PRODUCTS=false will fetch live data from WooCommerce (API keys required).

# Run development server
pnpm run dev

## 🛡️ Git Hooks (Husky)

If you want to enable pre-commit hooks locally, run:

```bash
pnpm husky install
````

This is not required in CI and is only needed for local development.

## 🛒 WooCommerce Integration

- Product data is fetched via `/src/lib/wpapi.ts` using API keys and category ID.
- If API keys or category ID are missing, or validation fails, the app falls back to mock data.
- Category filtering uses `WORDPRESS_PRODUCT_CATEGORY_ID`.

## 🧑‍💻 Troubleshooting

- If you see "Headers Overflow" or API errors:
  - Double-check your API keys and category ID in `.env.local`.
  - Ensure only valid string headers are sent (see `fetchAPI` in `wpapi.ts`).
  - Test your API endpoint with `curl` or Postman.
  - Set `USE_MOCK_PRODUCTS=true` to bypass live API for local development.
  - See enhanced error logs in the console for details.

## 📦 API Client

- All WordPress and WooCommerce API logic is in `src/lib/wpapi.ts`.
