"use client";

import {ThemeProvider, ThemeProviderProps} from "next-themes";
import {useState, useEffect} from "react";

export default function Providers({children, ...props}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>; // Render children without ThemeProvider during SSR
  }

  return <ThemeProvider {...props}>{children}</ThemeProvider>; // Wrap children with ThemeProvider after mount
}
