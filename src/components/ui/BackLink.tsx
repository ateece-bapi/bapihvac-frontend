import Link from 'next/link';

interface BackLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function BackLink({ href, children }: BackLinkProps) {
  return (
    <div className="mt-12">
      <Link 
        href={href}
        className="inline-flex items-center text-bapi-blue hover:text-bapi-blue-dark transition-colors"
      >
        ← {children}
      </Link>
    </div>
  );
}