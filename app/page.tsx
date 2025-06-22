import BlurryBG from "@/components/shared/BlurryBG";
import ArrorUpRight from "@/components/ui/ArrorUpRight";
import RenderIf from "@/utils/RenderIf";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Hero className="md:top-[55px] top-[40px] text-[68px] md:text-[100px] lg:text-[130px]" />
      <CardsSection className="pt-[20px]" />
    </div>
  );
}

const Hero = ({ className }: { className?: string }) => {
  return (
    <div
      className={`absolute  left-0 flex items-center justify-center w-full  text-center  font-semibold ${className}`}
    >
      <p>Hasanali </p>
      <p className="hidden lg:inline-block">Asadov</p>
    </div>
  );
};

const CardsSection = ({ className }: { className?: string }) => {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className=" flex flex-col md:flex-row gap-4">
        <Card className="md:w-1/2 lg:w-1/4 w-full" title="About" />
        <Card className="md:w-1/2 lg:w-3/4 w-full" title="Portfolio" />
      </div>
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <div className="flex w-full  lg:w-3/4 gap-4">
          <Card className="w-1/2 md:w-2/3" title="Contact" />
          <ImageCard />
        </div>
        <div className="flex w-full lg:w-1/4 flex-row lg:flex-col gap-4">
          <Stack />
          <Card className="mini lg:!h-1/2 !w-full" title="Resume" />
        </div>
      </div>
    </div>
  );
};

const Card = ({
  className,
  title,
}: {
  className?: string;
  title?: string;
  path?: string;
}) => {
  return (
    <Link href={title?.toLowerCase() || "#"} className={`card  ${className} `}>
      <BlurryBG className="w-full h-full rounded-lg" />
      <RenderIf condition={!!title}>
        <div className="flex items-center justify-between w-full">
          <div>{title}</div>
          <ArrorUpRight />
        </div>
      </RenderIf>
    </Link>
  );
};

const Stack = () => {
  return (
    <div className="card mini lg:!h-1/2 !w-full">
      <BlurryBG className="w-full h-full rounded-lg" />
      <div>Stack</div>
    </div>
  );
};

const ImageCard = ({ src }: { src?: string }) => {
  return (
    <div className="card  w-1/2 md:w-1/3 ">
      <div>
        <Image
          className="object-cover"
          src={src || "/hasanali.jpg"}
          alt="me"
          fill
        />
      </div>
    </div>
  );
};
