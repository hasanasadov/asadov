import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto relative">
      <Navbar />
      <div className="flex items-center justify-center w-full text-[100px] absolute top-[100px] left-0 font-bold">
        Hasanali Asadov
      </div>
      <div className="flex flex-col gap-4">
        <div className="pt-32 flex flex-col lg:flex-row gap-4">
          <div className="card lg:w-1/4 w-full">
            <div>About</div>
          </div>
          <div className="card lg:w-3/4 w-full">
            <div>Portfolio</div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div className="flex w-full  lg:w-3/4 gap-4">
            <div className="card  w-1/2 md:w-2/3">Contact</div>
            <div className="card  w-1/2 md:w-1/3 overflow-hidden">
              <div>
                <Image src="/1.webp" fill alt="me" />
              </div>
            </div>
          </div>
          <div className="flex w-full  lg:w-1/4 flex-row lg:flex-col gap-4">
            <div className="card lg:!h-1/2 !w-full">cards</div>
            <div className="card lg:!h-1/2 !w-full">resume</div>
          </div>
        </div>
      </div>
    </div>
  );
}
