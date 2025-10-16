export default function Home() {
  return (
    <main className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-bapi-blue mb-4">BAPI HVAC</h1>
        <p className="text-xl text-gray-600 mb-8">
          Next.js + TypeScript Headless WordPress Frontend
        </p>
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          🚀 Project Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✅</span>
              <span>Next.js 14 with App Router</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✅</span>
              <span>TypeScript configured</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✅</span>
              <span>WordPress API integration</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✅</span>
              <span>WooCommerce products loading</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✅</span>
              <span>Tailwind CSS styling</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-yellow-500 font-bold">⏳</span>
              <span>Job estimates system</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-bapi-blue">🛒 Products</h3>
          <p className="text-gray-600 mb-4">
            Browse our complete catalog of BAPI HVAC sensors and equipment.
          </p>
          <a 
            href="/products" 
            className="inline-block bg-bapi-blue text-white px-4 py-2 rounded-md hover:bg-bapi-blue-dark transition-colors"
          >
            View Products
          </a>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-bapi-blue">📊 Job Estimates</h3>
          <p className="text-gray-600 mb-4">
            Get custom quotes for your HVAC projects and installations.
          </p>
          <button 
            className="inline-block bg-gray-300 text-gray-500 px-4 py-2 rounded-md cursor-not-allowed"
            disabled
          >
            Coming Soon
          </button>
        </div>
      </div>
    </main>
  );
}