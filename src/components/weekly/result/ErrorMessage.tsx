import React from "react";
import { dashboardTheme } from "@/styles/theme";

interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: dashboardTheme.colors.primary }}
    >
      <div className="text-center p-6">
        <p
          className="text-xl mb-4"
          style={{ color: dashboardTheme.colors.error }}
        >
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: dashboardTheme.colors.accent,
            color: dashboardTheme.colors.activeText,
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};