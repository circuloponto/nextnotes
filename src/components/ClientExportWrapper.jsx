'use client';

import { useEffect, useState } from 'react';
import ExportMenu from './ExportMenu';

// This component ensures that the export functionality only runs on the client side
const ClientExportWrapper = ({ note }) => {
  const [mounted, setMounted] = useState(false);

  // Only render on client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <ExportMenu note={note} />;
};

export default ClientExportWrapper;
