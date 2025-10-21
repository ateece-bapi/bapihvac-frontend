import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from './ProductList';
import { WooCommerceProduct } from '@/types/schemas';

// Complete WooCommerceProduct mock with all required fields
const completeMockProduct: WooCommerceProduct = {
  id: 1,
  name: 'Test Product',
  slug: 'test-product',
  permalink: 'https://example.com/product/test-product',
  date_created: '2025-01-01T00:00:00',
  date_created_gmt: '2025-01-01T00:00:00',
  date_modified: '2025-01-01T00:00:00',
  date_modified_gmt: '2025-01-01T00:00:00',
  type: 'simple',
  status: 'publish',
  featured: false,
  catalog_visibility: 'visible',
  description: 'A test product',
  short_description: 'Short desc',
  sku: 'SKU-1',
  price: '10.00',
  regular_price: '10.00',
  sale_price: '',
  date_on_sale_from: null,
  date_on_sale_from_gmt: null,
  date_on_sale_to: null,
  date_on_sale_to_gmt: null,
  price_html: '',
  on_sale: false,
  purchasable: true,
  total_sales: 0,
  virtual: false,
  downloadable: false,
  external_url: '',
  button_text: '',
  tax_status: 'taxable',
  tax_class: '',
  manage_stock: false,
  stock_quantity: 5,
  stock_status: 'instock',
  backorders: 'no',
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
  categories: [{ id: 1, name: 'Category', slug: 'category' }],
  tags: [],
  images: [{ id: 1, src: 'https://placehold.co/300x200', alt: 'Test Product' }],
  attributes: [],
  default_attributes: [],
  variations: [],
  grouped_products: [],
  menu_order: 0,
  meta_data: [],
  dimensions: { length: '', width: '', height: '' },
};

describe('ProductList', () => {
  it('renders a list of products', () => {
    render(<ProductList products={[completeMockProduct]} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('renders empty state when no products', () => {
    render(<ProductList products={[]} />);
    expect(screen.getByText(/no products found/i)).toBeInTheDocument();
  });
});
