import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import "leaflet/dist/leaflet.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";

import { DM_Serif_Display, Space_Grotesk } from "next/font/google";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
  adjustFontFallback:true
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback:true
});


export const metadata: Metadata = {
  title: "Do Rent",
  description: "Get your dream rental property easily with Do Rent",
  robots:{
    index:true,
    follow:true,
    
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${dmSerif.variable} ${spaceGrotesk.variable}`}>
        <Providers>
          <Header />
          <Toaster position="top-right" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
