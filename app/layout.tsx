import { metaKeywords } from "@/constants/metadata";
import { Toaster } from "sonner";
import CustomLayout from "@/layouts/CustomLayout";
import Navbar from "@/components/shared/Navbar";
import "@/styles/globals.css";

export const metadata = {
  title: "Portfolio - Hasanali Asadov",
  description: "Welcome to Hasanali personal website",
  keywords: metaKeywords,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="p-4 pt-1  min-h-screen flex flex-col justify-between !bg-[#f0f0f0] !text-black dark:!bg-black dark:!text-white overflow-x-hidden">
        <CustomLayout>
          <Navbar />
          <Toaster richColors />
          {children}
        </CustomLayout>
      </body>
    </html>
  );
}
