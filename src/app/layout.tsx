import type { Metadata } from "next";
import { Lato, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const lato = Lato({ 
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: '--font-lato',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: "Svasthify - Your Wellness Partner",
  description: "Yoga, Meditation, and Wellness Programs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      {/* 👇 added suppressHydrationWarning here */}
      <body suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        {/* Footer will go here */}
      </body>
    </html>
  );
}
