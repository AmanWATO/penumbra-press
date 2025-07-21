import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import ConfirmPage from "./ConfirmPage";

export default function ConfirmPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          <Loader2 className="animate-spin h-10 w-10 text-purple-300" />
        </div>
      }
    >
      <ConfirmPage />
    </Suspense>
  );
}
