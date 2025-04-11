'use client';

import { usePathname } from 'next/navigation';
import NavbarWrapper from './NavbarWrapper';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  return (
    <>
      <NavbarWrapper />
      <main className={isLandingPage ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}>
        {children}
      </main>
    </>
  );
} 