import type { Metadata } from "next";
import { Archivo, Literata } from "next/font/google";
import "./globals.css";
import { TabBar } from "@/components/tab-bar";

// Official CreArtBox typefaces: Archivo for text, Literata for display.
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});
const literata = Literata({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-literata",
});

export const metadata: Metadata = {
  title: {
    default: "CreArtBox — Digital Concert Hall",
    template: "%s · CreArtBox",
  },
  description:
    "Exceptional classical and new music, presented with a crafted visual aesthetic. Stream on-demand performances in HD, 4K, and lossless audio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${literata.variable}`}>
      <body className="min-h-screen">
        <main className="mx-auto max-w-content pb-24">{children}</main>
        <TabBar />
      </body>
    </html>
  );
}
