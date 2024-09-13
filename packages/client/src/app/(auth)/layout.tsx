import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";

import { Inter } from "next/font/google";

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
      <body className={inter.className}>
        <Theme accentColor="brown">{children}</Theme>
      </body>
    </html>
  );
}
