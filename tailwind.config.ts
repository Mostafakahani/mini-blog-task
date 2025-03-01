import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lobester: ["var(--font-lobester)", "serif"],
        modam: ["var(--font-modam-regular)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
