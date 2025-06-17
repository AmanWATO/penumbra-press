import { dashboardTheme } from "@/styles/theme";
import { useEffect, useState } from "react";

const AnimatedCounter = ({
  value,
  loading,
}: {
  value: number;
  loading: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!loading && value > 0) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [value, loading]);

  if (loading) {
    return (
      <div className="w-8 h-8 mx-auto">
        <div
          className="animate-spin rounded-full h-full w-full border-2 border-t-transparent"
          style={{
            borderColor: dashboardTheme.colors.accent,
            borderTopColor: "transparent",
          }}
        />
      </div>
    );
  }

  return <span>{count.toLocaleString()}</span>;
};


export default AnimatedCounter