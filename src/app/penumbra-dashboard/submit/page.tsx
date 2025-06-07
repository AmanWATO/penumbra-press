'use client'

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { entryFees } from "@/lib/contest";
import { useRouter } from "next/navigation";

export default function PlanSelection() {
  const router = useRouter();

  const handleSelectPlan = () => {
    router.push("/penumbra-dashboard/submit/guidelines");
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold mb-4">Choose a Submission Plan</h2>
      <div className="grid gap-6">
        {entryFees.map((fee, idx) => (
          <div
            key={idx}
            className="p-4 bg-[#2e2e2e] border border-gray-600 rounded"
          >
            <h3 className="text-xl font-bold">{fee.title}</h3>
            <p>{fee.description}</p>
            {fee.note && <small className="text-gray-400">{fee.note}</small>}
            <button
              className="mt-3 bg-[#a9745f] text-white px-4 py-2 rounded"
              onClick={handleSelectPlan}
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
