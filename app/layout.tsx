import type { Metadata } from "next";
import "./globals.css";
import { TabBar } from "@/components/tab-bar";

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
    <html lang="en">
      <body className="min-h-screen">
        <main className="mx-auto max-w-content pb-24">{children}</main>
        <TabBar />
      </body>
    </html>
  );
}
