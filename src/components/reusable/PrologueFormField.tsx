import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { dashboardTheme } from "@/styles/theme";

interface PrologueFormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "textarea";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  maxLength?: number;
  showCharCount?: boolean;
}

export const PrologueFormField: React.FC<PrologueFormFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
  rows,
  maxLength,
  showCharCount = false,
}) => {
  const InputComponent = type === "textarea" ? "textarea" : "input";
  const inputType = type === "textarea" ? undefined : type;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label
          className="block text-sm font-medium"
          style={{
            color: dashboardTheme.colors.textPrimary,
            fontFamily: dashboardTheme.fonts.body,
          }}
        >
          {label} {required && "*"}
        </label>
        {showCharCount && maxLength && (
          <span
            className={`text-sm font-medium ${
              value.length > maxLength ? "text-red-500" : ""
            }`}
            style={{
              color:
                value.length > maxLength
                  ? dashboardTheme.colors.error
                  : dashboardTheme.colors.textSecondary,
            }}
          >
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      <InputComponent
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 resize-none"
        style={{
          backgroundColor: dashboardTheme.components.input.bg,
          borderColor: error
            ? dashboardTheme.colors.error
            : dashboardTheme.components.input.border,
          color: dashboardTheme.colors.textPrimary,
          fontFamily: dashboardTheme.fonts.body,
        }}
        placeholder={placeholder}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            className="text-sm mt-1 flex items-center gap-1"
            style={{ color: dashboardTheme.colors.error }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};