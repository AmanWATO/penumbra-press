'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";

export const PanelistPromoWidget = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transition-opacity duration-1000 ease-out ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className="absolute bottom-8 right-8 max-w-sm bg-parchment border border-lightSepia rounded-lg p-5 shadow-md"
        style={{
          fontFamily: 'var(--font-nunito-sans)',
          color: '#3a3630',
        }}
      >
        <p className="text-sm" style={{ fontStyle: 'italic', color: '#5a513c' }}>
          “What if a single image could whisper a story?”
        </p>
        <p className="text-xs mt-1">
          Discover <strong style={{ color: '#1a6b6b' }}>visual storytelling</strong> in its most distilled form.
        </p>
        <Link
          href="https://thepanelist.in"
          target="_blank"
          className="inline-block mt-2 text-xs font-semibold text-deepTeal hover:text-nightBlue underline transition-all duration-200"
        >
          Visit The Panelist →
        </Link>
      </div>
    </div>
  );
};
