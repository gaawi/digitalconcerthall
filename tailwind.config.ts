import type { Config } from "tailwindcss";

/**
 * Palette and type from the official CreArtBox brand study (Guidelines v1.1).
 * Semantic tokens keep their Spanish brand names; the legacy `ink`/`gold`/
 * `neutral` scales are remapped onto them so the whole app inherits the brand.
 *
 *   sala   #070706  the darkened hall — page background
 *   foso   #100F0E  the pit — surfaces / panels
 *   filete #2B2825  hairline rules & borders
 *   papel  #F2EFE8  paper — primary text on dark
 *   dim    #9C968C  muted text
 *   acento #FFC403  the signal — amber accent
 */
const brand = {
  sala: "#070706",
  foso: "#100F0E",
  filete: "#2B2825",
  fileteAlto: "#3D3934",
  papel: "#F2EFE8",
  papelMedio: "#C9C3B9",
  papelTenue: "#8A847A",
  papelMudo: "#6B655D",
  dim: "#9C968C",
  acento: "#FFC403",
  sobreAcento: "#0B0705",
};

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic brand tokens
        sala: brand.sala,
        foso: brand.foso,
        filete: { DEFAULT: brand.filete, alto: brand.fileteAlto },
        papel: {
          DEFAULT: brand.papel,
          medio: brand.papelMedio,
          tenue: brand.papelTenue,
          mudo: brand.papelMudo,
        },
        acento: brand.acento,

        // "Paper", not pure white — every text-white picks up the brand tone.
        white: brand.papel,

        // Legacy scales remapped to the brand
        ink: {
          950: brand.sala,
          900: brand.sala,
          850: brand.sobreAcento,
          800: brand.foso,
          700: "#1C1A19",
          600: brand.filete,
        },
        gold: {
          light: "#FFD84D",
          DEFAULT: brand.acento,
          400: brand.acento,
          500: brand.acento,
          dim: "#D9A502",
        },
        neutral: {
          100: brand.papel,
          200: brand.papel,
          300: brand.papelMedio,
          400: brand.dim,
          500: brand.papelTenue,
          600: brand.papelMudo,
          700: brand.fileteAlto,
          800: brand.filete,
          900: brand.foso,
        },
      },
      fontFamily: {
        // Body text: Archivo. Display/headings: Literata.
        sans: ["var(--font-archivo)", "Helvetica", "Arial", "sans-serif"],
        serif: ["var(--font-literata)", "Georgia", "serif"],
        display: ["var(--font-literata)", "Georgia", "serif"],
      },
      maxWidth: {
        content: "1120px", // brand --ancho-max
        medida: "36em", // brand --medida (reading measure)
      },
      spacing: {
        secc: "clamp(64px, 9vw, 120px)", // brand --aire-secc
      },
    },
  },
  plugins: [],
};

export default config;
