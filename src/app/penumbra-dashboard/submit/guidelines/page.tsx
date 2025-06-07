"use client";

import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { guidelines } from "@/lib/contest";

export default function GuidelinesPage() {
  const router = useRouter();

  const handleAgree = () => {
    router.push("/penumbra-dashboard/submit/form");
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold mb-4">Contest Guidelines</h2>
      <ul className="space-y-2">
        {guidelines.map((g, idx) => (
          <li key={idx} className="border-b border-gray-700 pb-2">
            <strong>{g.label}</strong> {g.value}
          </li>
        ))}
      </ul>
      <button
        className="mt-6 bg-green-600 px-4 py-2 rounded text-white"
        onClick={handleAgree}
      >
        I Agree to the Guidelines
      </button>
    </DashboardLayout>
  );
}
