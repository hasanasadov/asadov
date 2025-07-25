import Navbar from "@/components/shared/Navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import "@/styles/globals.css";

export const metadata = {
  title: "Home - Hasanali Asadov",
  description: "Welcome to Hasanali personal website",
  keywords: [
    "Hasanali Asadov",
    "Hasanali Asadov Portfolio",
    "Hasanali Asadov Website",
    "Hasanali Asadov Personal Website",
    "Hasanali Asadov Web Developer",
    "Hasanali Asadov Software Engineer",
    "Hasanali Asadov Resume",
    "Hasanali Asadov CV",
    "Hasanali Asadov Full Stack Developer",
    "Hasanali Asadov Frontend Developer",
    "Hasanali Asadov Backend Developer",
    "Hasanali Asadov Projects",
    "Hasanali Asadov Works",
    "Hasanali Asadov Portfolio Website",
    "Hasanali",
    "Asadov",
    "Portfolio",
    "Web Developer",
    "Software Engineer",
    "Personal Website",
  ],
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
          <Toaster richColors />
          <SpeedInsights />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
