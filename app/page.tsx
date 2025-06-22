import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-4 pt-1  min-h-screen flex flex-col justify-between ">
      <Navbar />
      <div className="top-[40px] flex items-center justify-center w-full text-[68px] md:text-[100px] lg:text-[130px] text-center absolute  left-0 font-bold">
        Hasanali
      </div>
      <div className="pt-[40px] flex flex-col gap-4">
        <div className=" flex flex-col md:flex-row gap-4">
          <div className="card md:w-1/2 lg:w-1/4 w-full">
            <div>About</div>
          </div>
          <div className="card md:w-1/2 lg:w-3/4 w-full">
            <div>Portfolio</div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div className="flex w-full  lg:w-3/4 gap-4">
            <div className="card  w-1/2 md:w-2/3">Contact</div>
            <div className="card  w-1/2 md:w-1/3 overflow-hidden">
              <div>
                <Image
                  className="object-cover"
                  src="/hasanali.jpg"
                  alt="me"
                  fill
                />
              </div>
            </div>
          </div>
          <div className="flex w-full lg:w-1/4 flex-row lg:flex-col gap-4">
            <div className="card mini lg:!h-1/2 !w-full  ">cards</div>
            <div className="card mini lg:!h-1/2 !w-full ">resume</div>
          </div>
        </div>
      </div>
    </div>
  );
}
