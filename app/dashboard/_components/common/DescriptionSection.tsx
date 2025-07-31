import RenderIf from "@/utils/RenderIf";

type Props = {
  isEditing: boolean;
  description: string;
  setDescription: (val: string) => void;
};

export const DescriptionSection = ({
  isEditing,
  description,
  setDescription,
}: Props) => {
  return (
    <div className="md:w-1/2 w-full text-left text-[14px] md:text-[16px] dark:text-white/80 text-black/80">
      <RenderIf condition={isEditing}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="!w-full outline custom-button p-2 pb-10 overflow-y-scroll text-cyan-500 bg-transparent  min-h-[200px] max-h-[300px]"
          placeholder="Enter description"
        />
      </RenderIf>
      <RenderIf condition={!isEditing}>
        <p>{description}</p>
      </RenderIf>
    </div>
  );
};
