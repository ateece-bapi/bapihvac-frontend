// Deprecated audit page. Use /wp-audit/page.tsx for posts/pages field audit.
// This component is intentionally minimal and error-free.

export default function WPAuditFieldsDeprecated() {
  return (
    <div style={{ padding: 24, color: '#b00', background: '#fffbe6', border: '1px solid #ffe58f' }}>
      <h1>Deprecated Audit Page</h1>
      <p>This page is deprecated. Please use <b>/wp-audit/page</b> for posts/pages field audit.</p>
    </div>
  );
}
