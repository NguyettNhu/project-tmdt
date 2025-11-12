// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "STYLA - Modern Fashion Essentials",
  description: "Discover modern fashion essentials with minimal boldness design",
};

/**
 * Root Layout - Layout chính cho toàn bộ ứng dụng
 * Sử dụng flexbox để đảm bảo Footer luôn ở cuối trang
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased bg-white text-[#1A1A1A] flex flex-col min-h-screen`}
      >

        <CartProvider>
          <Header />
          {/* Main content area - grows to fill available space */}
          <div className="grow w-full">
            {children}
          </div>
          
          {/* Footer - always at bottom */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}