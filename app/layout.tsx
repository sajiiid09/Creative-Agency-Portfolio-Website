import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pulse - Creative Digital Platform",
  description: " Pulse is a cutting-edge digital platform that fuses creativity and technology to deliver innovative solutions for modern businesses.",
};

// layout.tsx

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* FIX: Changed 'overflow-x-hidden' to 'overflow-x-clip'
         This restores the window as the main scroll container.
      */}
      <body className={`${inter.variable} font-sans antialiased bg-white text-black overflow-x-clip`}>
        {children}
      </body>
    </html>
  );
}