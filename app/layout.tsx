import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import BlurryBG from "@/components/shared/BlurryBG";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Hasanali Asadov - Portfolio",
  description:
    "Portfolio of Hasanali Asadov, a software engineer specializing in web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="p-4 pt-1  min-h-screen flex flex-col justify-between ">
        <BlurryBG  />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
