'use client';

import Navbar from './Navbar';

// This wrapper ensures the Navbar is only mounted on the client
export default function NavbarWrapper() {
  return <Navbar />;
}
