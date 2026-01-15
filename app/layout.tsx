import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Wix_Madefor_Text } from "next/font/google";
import "leaflet/dist/leaflet.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";

const wixFont = Wix_Madefor_Text({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Do Rent",
  description: "Get your dream rental property easily with Do Rent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={wixFont.className}>
        <Providers>
          <Header />
          <Toaster position="top-right" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
