import ContactForm from "@/components/shared/ContactForm";
import Footer from "@/components/shared/Footer";
import HoverText from "@/components/shared/HoverText";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Contact - Hasanali Asadov",
  description: "Əlaqə səhifəsi - Hasanali Asadov portfolio.",
};

const AboutPage = () => {
  return (
    <div className="min-h-screen  md:p-8">
      <h1 className="text-[26px] md:text-[36px] lg:text-[48px] leading-tight lg:w-8/12 mb-12">
        If you prefer not to fill out forms, feel free to email me directly and
        let&#39;s talk about the next big thing!
      </h1>

      <div className="flex flex-col md:flex-row md:gap-24 gap-6 justify-between w-full">
        <div className="md:w-1/3 w-full">
          <div className="w-full md:w-1/2 flex flex-col md:gap-4 gap-2 text-2xl">
            <Link href="mailto:hasanaliasadov@gmail.com">
              <HoverText text="hasanaliasadov@gmail.com" />
            </Link>
            <Link href="tel:+994502068605">
              <HoverText text="+994 50 206 86 05" />
            </Link>
          </div>
        </div>
        <div className="md:w-2/3 w-full">
          <ContactForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
