// Layout component for Next.js application
export default function Layout({ children }) {
    return (
        <html>
            <head>
                <title>BAPI HVAC Frontend</title>
            </head>
            <body>{children}</body>
        </html>
    );
}