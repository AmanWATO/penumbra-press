"use client";

import { Header } from "@/components/header";
import { usePathname } from "next/navigation";

const HIDDEN_HEADER_ROUTES = ["/login", "/register", "/reset", "/penumbra-dashboard"];

export function GlobalHeader() {
  const pathname = usePathname();

  const isHidden = HIDDEN_HEADER_ROUTES.some((route) =>
    pathname.includes(route)
  );

  if (isHidden) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <Header />
    </header>
  );
}
