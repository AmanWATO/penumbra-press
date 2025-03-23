import { useTheme } from "@/lib/ThemeProvider";

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormField({
  id,
  label,
  type,
  value,
  onChange,
}: FormFieldProps) {
  const theme = useTheme();

  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-1 md:mb-2 text-sm font-medium"
        style={{ color: theme.text.primary }}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required
        className="w-full px-3 md:px-4 py-2 rounded-md border text-sm md:text-base"
        style={{
          borderColor: theme.border.medium,
          backgroundColor: theme.background.primary,
          color: theme.text.primary,
        }}
      />
    </div>
  );
}
