import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

// const roboto = Roboto({ subsets: ["latin"], weight: "700" });
const myFont = localFont({
  src: "../public/assets/fonts/Arial/arialbd.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${myFont.className}`}>{children}</body>
    </html>
  );
}