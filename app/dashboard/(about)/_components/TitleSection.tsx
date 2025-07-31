import RenderIf from "@/utils/RenderIf";

type Props = {
  isEditing: boolean;
  title1: string;
  title2: string;
  setTitle1: (val: string) => void;
  setTitle2: (val: string) => void;
  originalTitle1: string;
  originalTitle2?: string | null;
};

export const TitleSection = ({
  isEditing,
  title1,
  title2,
  setTitle1,
  setTitle2,
  originalTitle1,
  originalTitle2,
}: Props) => {
  return (
    <div className="w-full text-left">
      <RenderIf condition={isEditing}>
        <>
          <input
            type="text"
            value={title1}
            onChange={(e) => setTitle1(e.target.value)}
            className="text-[16px] text-cyan-500 md:text-[20px] w-full outline custom-button px-2 break-words bg-transparent"
            placeholder="Title 1"
          />
          <input
            type="text"
            value={title2}
            onChange={(e) => setTitle2(e.target.value)}
            className="text-[16px] text-cyan-500 md:text-[20px] w-full outline custom-button px-2 bg-transparent mt-2"
            placeholder="Title 2"
          />
        </>
      </RenderIf>
      <RenderIf condition={!isEditing}>
        <>
          <p className="text-[16px] md:text-[20px] font-medium">
            {originalTitle1}
          </p>
          <p className="text-[16px] md:text-[20px] text-gray-500">
            {originalTitle2}
          </p>
        </>
      </RenderIf>
    </div>
  );
};
