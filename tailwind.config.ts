import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#050d1a",
          800: "#0a1628",
          700: "#0f1f33",
          600: "#16293f",
          500: "#1f3a55",
        },
        gold: {
          400: "#e0c668",
          500: "#c9a84c",
          600: "#a88838",
          700: "#7a6428",
        },
        ivory: "#f4f1eb",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
