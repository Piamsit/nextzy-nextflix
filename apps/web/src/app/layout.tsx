import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "../providers/query-client-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Netflix Clone',
  description: 'A beautiful Netflix clone built with Next.js and Tailwind CSS',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <main className="max-w-screen min-h-screen bg-black text-white">
                <Header />
                {children}
              </main>
            </ThemeProvider>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}