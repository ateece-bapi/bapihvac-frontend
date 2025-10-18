import Link from 'next/link';
import { Icon } from './Icon';

interface BackLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function BackLink({ href, children }: BackLinkProps) {
  return (
    <div className="mt-12">
      <Link 
        href={href}
        className="inline-flex items-center gap-2 text-bapi-blue hover:text-bapi-blue-dark transition-colors"
      >
        <Icon name="arrowLeft" size="sm" className="transition-transform group-hover:-translate-x-1" />
        {children}
      </Link>
    </div>
  );
}