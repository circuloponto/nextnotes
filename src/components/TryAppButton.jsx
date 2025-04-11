'use client';

import Link from 'next/link';

export default function TryAppButton() {
  return (
    <Link
      href="/login"
      className="inline-block bg-black text-white dark:bg-white dark:text-black px-8 py-3 rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 text-lg"
    >
      Login
    </Link>
  );
} 