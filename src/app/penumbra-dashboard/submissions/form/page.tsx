import { Suspense } from "react";
import SubmissionForm from "./SubmissionFormPage";

function SubmissionFormLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-sm text-gray-600">Loading submission form...</p>
      </div>
    </div>
  );
}

export default function SubmissionFormPage() {
  return (
    <Suspense fallback={<SubmissionFormLoading />}>
      <SubmissionForm />
    </Suspense>
  );
}
