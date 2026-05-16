import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import prisma from "@/lib/prisma";
import { getSettings } from "@/app/admin/actions";

export const dynamic = 'force-dynamic';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata = {
  title: "PADOWA Health Care - Love in Every Dose",
  description: "A premium doctor-led pharmaceutical organization committed to delivering quality-driven and innovative healthcare solutions.",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const divisions = await prisma.division.findMany();
  const settings = await getSettings([
    "contact_email", "contact_phone", "contact_address",
    "footer_tagline", "footer_description",
    "social_fb", "social_ig", "social_li", "social_tw"
  ]);

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sora.variable} antialiased`}
      >
        <CustomCursor />
        <Navbar />
        {children}
        <Footer divisions={divisions} settings={settings} />
      </body>
    </html>
  );
}
