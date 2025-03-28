"use client";

import { Footer } from "@/components/footer";
import { usePathname } from "next/navigation";

const HIDDEN_FOOTER_ROUTES = ["/contact-us"];

export function GlobalFooter() {
  const pathname = usePathname();

  const isHidden = HIDDEN_FOOTER_ROUTES.some((route) =>
    pathname.includes(route)
  );

  if (isHidden) {
    return null;
  }

  return <Footer />;
}
