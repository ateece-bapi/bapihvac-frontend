# BAPI HVAC Frontend

**Next.js 14 + TypeScript Headless WordPress Frontend**

This is the modern frontend for [bapihvac.com](https://www.bapihvac.com/), built with Next.js and TypeScript, consuming data from the WordPress backend.

## 🔗 Related Repositories

- **WordPress Backend**: [ateece-bapi/bapihvac-wordpress](https://github.com/ateece-bapi/bapihvac-wordpress)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your WordPress API credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/             # Utilities and API clients
└── types/           # TypeScript type definitions
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` and configure:

- `NEXT_PUBLIC_WORDPRESS_API_URL` - WordPress REST API endpoint
- `WOOCOMMERCE_CONSUMER_KEY` - WooCommerce API key
- `WOOCOMMERCE_CONSUMER_SECRET` - WooCommerce API secret

## 📚 Features to Migrate

- [ ] Product Catalog (WooCommerce)
- [ ] Job Estimates System
- [ ] User Favorites
- [ ] Multimedia Galleries
- [ ] User Authentication
- [ ] Search Functionality
- [ ] Custom Registration

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TBD (Tailwind CSS recommended)
- **API**: WordPress REST API / WPGraphQL
- **E-commerce**: WooCommerce

## 📖 Documentation

See [docs/](./docs/) for detailed documentation.

## 🤝 Contributing

Maintained by Andrew Teece (BAPI) with development by Vendi Advertising.