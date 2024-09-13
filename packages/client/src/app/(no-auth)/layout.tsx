import type { Metadata } from "next";
import '../global.css'

import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mail man",
  description: "Mail main is a marketing tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-primary text-fontColor px-5`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
