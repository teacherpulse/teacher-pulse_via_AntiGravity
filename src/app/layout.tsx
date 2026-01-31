import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NeuralBackground from "@/components/neural-background";
import ThemeBackground from "@/components/theme-background";

import { FeaturesProvider } from "@/components/features-provider";
import { FeaturesEffect } from "@/components/features-effect";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teacher Pulse",
  description: "Nalanda High School Teacher Evaluation Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="royal"
          enableSystem={false}
          disableTransitionOnChange
        >
          <FeaturesProvider>
            <FeaturesEffect />
            <ThemeBackground />
            <NeuralBackground />
            {children}
          </FeaturesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
