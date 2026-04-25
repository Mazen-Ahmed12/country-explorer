"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export default function DarkModeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <Button className="w-20 h-10" onClick={toggle}>
      {isDark ? "Light" : "Dark"}
    </Button>
  );
}