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
        // Exact palette from the iOS app's Theme.swift.
        ink: {
          950: "#0a0812", // gradient edge  rgb(0.04,0.03,0.07)
          900: "#0f0d17", // background     rgb(0.06,0.05,0.09)
          850: "#120d1c", // gradient mid   rgb(0.07,0.05,0.11)
          800: "#1c1a24", // surface        rgb(0.11,0.10,0.14)
          700: "#1f1c29", // cardBackground rgb(0.12,0.11,0.16)
          600: "#26242e", // surfaceElevated rgb(0.15,0.14,0.18)
        },
        gold: {
          light: "#f2d98c", // goldLight rgb(0.95,0.85,0.55)
          DEFAULT: "#d9b85e", // gold    rgb(0.85,0.72,0.37)
          400: "#d9b85e",
          500: "#d9b85e",
          dim: "#bf9e45", // goldDim     rgb(0.75,0.62,0.27)
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "SF Pro Display",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
