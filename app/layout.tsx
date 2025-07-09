import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import { ThemeProvider } from "next-themes";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body className="p-4 pt-1  min-h-screen flex flex-col justify-between !bg-white !text-black dark:!bg-black dark:!text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={false}
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
