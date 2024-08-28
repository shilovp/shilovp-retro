import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";

const chicagoFont = localFont({ src: './ChicagoFLF.woff2', variable: '--chicago' })


export const metadata: Metadata = {
  title: "Shilovp retro OS",
  description: "OS-like retro fun project made by shilovp @severus256",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${chicagoFont.variable} overflow-hidden`}
      >{children}</body>
    </html>
  );
}
