"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link"; 

export default function GeoMessagePromo() {
  const [city, setCity] = useState("your city");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json");
        const data = await res.json();
        setCity(data.city || "your city");
      } catch (e) {
        setCity("your world");
      }
    };

    fetchLocation();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-[#F7F3ED] text-[#2D2A26] border-t border-[#5a513c]/20 shadow-md px-4 py-5 text-center text-sm md:text-base"
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-3">
        <span>
          🖋️ Writers of <strong className="text-[#5D4037]">{city}</strong>, your story could shape the shadows.
        </span>
        <Link
          href="/penumbra-script-contest"
          className="ml-2 inline-block bg-[#5D4037] text-[#f0ebe0] px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#2D2A26] transition-all duration-300"
        >
          Submit Starts After July 11th →
        </Link>
      </div>
    </motion.div>
  );
}
