'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

// This wrapper ensures the Navbar is only mounted on the client
export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Don't show navbar on the landing page
  if (pathname === '/') {
    return null;
  }

  return <Navbar />;
}
