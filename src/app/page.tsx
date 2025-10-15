export default function Home() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>BAPI HVAC</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        Next.js + TypeScript Headless WordPress Frontend
      </p>
      
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '2rem',
        backgroundColor: '#f9f9f9'
      }}>
        <h2>🚀 Getting Started</h2>
        <ul style={{ lineHeight: '2' }}>
          <li>✅ Next.js 14 with App Router</li>
          <li>✅ TypeScript configured</li>
          <li>✅ Project structure established</li>
          <li>⏳ WordPress API integration (next step)</li>
          <li>⏳ WooCommerce products</li>
          <li>⏳ Job estimates system</li>
        </ul>
      </div>
    </main>
  );
}