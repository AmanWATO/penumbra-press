"use client";

import React from "react";
import Link from "next/link";
import { colors, fonts } from "@/styles/theme";

export const ContestSection = () => {
  return (
    <section
      style={{ backgroundColor: colors.penumbraBlack, color: colors.gray100 }}
      className="py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto max-w-5xl text-center">
        <h2
          style={{ fontFamily: fonts.heading }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
        >
          The Shadow Script Contest
        </h2>
        <p
          style={{ fontFamily: fonts.body }}
          className="text-lg sm:text-xl italic mb-6"
        >
          &quot;Because the best stories often emerge from the edges of light.&quot;
        </p>

        <div
          className="w-16 sm:w-20 h-1 mb-8 mx-auto"
          style={{ backgroundColor: colors.deepSepia }}
        ></div>

        <div
          className="p-6 sm:p-8 rounded-lg border w-full max-w-2xl mx-auto mb-10"
          style={{ backgroundColor: colors.moonGray, borderColor: colors.darkSepia }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
            <div>
              <p style={{ fontFamily: fonts.heading }} className="text-lg sm:text-xl font-medium mb-1">
                Theme Reveal
              </p>
              <p style={{ color: colors.lightSepia }}>April 15, 2025</p>
            </div>

            <div className="hidden sm:block h-12 w-px" style={{ backgroundColor: colors.deepSepia }}></div>

            <div>
              <p style={{ fontFamily: fonts.heading }} className="text-lg sm:text-xl font-medium mb-1">
                Submissions Open
              </p>
              <p style={{ color: colors.lightSepia }}>May 1, 2025</p>
            </div>
          </div>
        </div>

        <p
          style={{ fontFamily: fonts.body, color: colors.mediumSepia }}
          className="mb-8 max-w-2xl mx-auto text-base sm:text-lg"
        >
          Join our literary contest with prizes up to ₹10,000 and a chance to be published in our exclusive anthology.
          Early bird entries at just ₹99.
        </p>

        <Link
          href="/shadow-script-contest"
          style={{
            fontFamily: fonts.button,
            backgroundColor: colors.deepSepia,
            color: colors.cream,
          }}
          className="px-6 sm:px-8 py-3 text-base sm:text-lg rounded-full hover:opacity-90 transition-opacity"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
};