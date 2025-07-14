"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/penumbra-dashboard/submissions");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-t-transparent border-gray-900 mx-auto mb-6"></div>
        <p className="text-base sm:text-lg md:text-xl font-medium text-gray-700">
          Loading your dashboard...
        </p>
      </div>
    </div>
  );
}
