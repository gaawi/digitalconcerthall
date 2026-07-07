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
        // Cinematic dark palette echoing the current concert-hall aesthetic.
        ink: {
          950: "#08090c",
          900: "#0d0f14",
          800: "#14171f",
          700: "#1d212b",
          600: "#2a2f3c",
        },
        gold: {
          400: "#e6c477",
          500: "#d4af61",
          600: "#b8934a",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
