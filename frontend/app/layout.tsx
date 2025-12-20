// app/layout.tsx
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

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
        <AuthProvider>
          <CartProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
            <Toaster position="bottom-right" richColors closeButton />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}