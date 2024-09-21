import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "../global.css";

import { GeistSans } from 'geist/font/sans';

import Navbar from "@/components/navbar/Navbar";

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
      <body className={`${GeistSans.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}

        </ThemeProvider>
      </body>
    </html>
  );
}
