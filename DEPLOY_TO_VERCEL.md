# Vercel Deployment Guide for BAPI HVAC Frontend

## 1. Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository (public or private)
- All environment variables ready (see below)

## 2. Environment Variables
Copy the following variables from your `.env.local`:

```
NEXT_PUBLIC_WORDPRESS_API_URL=https://www.bapihvac.com/wp-json
WOOCOMMERCE_CONSUMER_KEY=your_key
WOOCOMMERCE_CONSUMER_SECRET=your_secret
WORDPRESS_PRODUCT_CATEGORY_ID=your_category_id
USE_MOCK_PRODUCTS=false
```

## 3. Deploy Steps
1. Push your latest code to GitHub (main or feature branch).
2. Go to https://vercel.com and click **New Project**.
3. Import your GitHub repo.
4. Set the environment variables in the Vercel dashboard (Settings > Environment Variables).
5. Click **Deploy**.

## 4. After Deployment
- Visit your Vercel URL (e.g., `https://bapihvac-frontend.vercel.app`)
- Test all routes, especially `/wp-audit` and product/category pages
- Share the link with your team

## 5. Troubleshooting
- If you see build errors, check environment variables and logs in the Vercel dashboard.
- For API/network issues, verify your WordPress/WooCommerce site is accessible from the public internet.

---

For more details, see the [Vercel docs](https://vercel.com/docs/deploy-projects) or ask your team for access to the Vercel project.
