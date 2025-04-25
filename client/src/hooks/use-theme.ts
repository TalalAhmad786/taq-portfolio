import { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";

interface UseThemeReturn {
  theme: string;
  setTheme: (theme: string) => void;
  isDark: boolean;
}

export const useTheme = (): UseThemeReturn => {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  const [isDark, setIsDark] = useState(true);
  
  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);
  
  return {
    theme: theme || "dark",
    setTheme,
    isDark,
  };
};
