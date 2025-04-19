import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "../providers/query-client-provider";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Netflix Clone',
  description: 'A beautiful Netflix clone built with Next.js and Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}