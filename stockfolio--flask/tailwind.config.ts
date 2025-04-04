import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "#000000",
        foreground: "#ffffff",
        card: {
          DEFAULT: "#0a0a0a",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#0a0a0a",
          foreground: "#ffffff",
        },
        primary: {
          DEFAULT: "#ffffff",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#0a0a0a",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#1a1a1a",
          foreground: "#999999",
        },
        accent: {
          DEFAULT: "#1a1a1a",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#dc2626",
          foreground: "#ffffff",
        },
        border: "#1a1a1a",
        input: "#0a0a0a",
        ring: "#333333",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;