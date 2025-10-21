import Link from 'next/link';
import { Icon } from '../ui/Icon';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-bapi-blue text-white p-2 rounded-lg">
              <Icon name="thermometer" size="lg" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-gray-900">BAPI HVAC</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-700 hover:text-bapi-blue transition-colors"
            >
              <Icon name="home" size="sm" />
              Home
            </Link>

            <Link
              href="/products"
              className="flex items-center gap-2 text-gray-700 hover:text-bapi-blue transition-colors"
            >
              <Icon name="sensor" size="sm" />
              Products
            </Link>

            <Link
              href="/categories"
              className="flex items-center gap-2 text-gray-700 hover:text-bapi-blue transition-colors"
            >
              <Icon name="settings" size="sm" />
              Categories
            </Link>

            <Link
              href="/contact"
              className="flex items-center gap-2 text-gray-700 hover:text-bapi-blue transition-colors"
            >
              <Icon name="phone" size="sm" />
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-bapi-blue transition-colors">
              <Icon name="search" size="lg" />
            </button>

            <button className="text-gray-700 hover:text-bapi-blue transition-colors relative">
              <Icon name="cart" size="lg" />
              <span className="absolute -top-2 -right-2 bg-bapi-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Mobile menu button */}
            <button className="md:hidden text-gray-700 hover:text-bapi-blue transition-colors">
              <Icon name="menu" size="lg" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
