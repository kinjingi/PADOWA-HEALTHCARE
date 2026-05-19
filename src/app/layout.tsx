import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";
import QueryProvider from "@/components/QueryProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PADOWA Health Care - Love in Every Dose",
  description:
    "A premium doctor-led pharmaceutical organization committed to delivering quality-driven and innovative healthcare solutions.",
  icons: {
    icon: "/favicon.png",
  },
};

// NOTE: We've removed Firebase calls from the root layout.
// Navbar, Footer data is fetched from their own async sub-components
// or from dedicated layout files to avoid blocking every page.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider><QueryProvider><body className={`${inter.variable} ${sora.variable} antialiased`}>
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
      </body></QueryProvider></ThemeProvider>
    </html>
  );
}
