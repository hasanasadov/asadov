import RenderIf from "@/utils/RenderIf";

type Props = {
  isEditing: boolean;
  startDate: string;
  endDate: string;
  originalStart: Date | string;
  originalEnd?: Date | string;
  setStartDate: (val: string) => void;
  setEndDate: (val: string) => void;
};

export const DateSection = ({
  isEditing,
  startDate,
  endDate,
  originalStart,
  originalEnd,
  setStartDate,
  setEndDate,
}: Props) => {
  const start = new Date(originalStart);
  const end = originalEnd ? new Date(originalEnd) : undefined;

  return (
    <div className="w-1/2 text-[14px] md:text-[16px]">
      <RenderIf condition={isEditing}>
        <div className="flex flex-col gap-2">
          <input
            type="month"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="outline custom-button px-4 !w-40 md:!w-52 text-cyan-500 bg-transparent "
          />
          <input
            type="month"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="outline custom-button  px-4 !w-40 md:!w-52 !text-cyan-500 bg-transparent "
          />
        </div>
      </RenderIf>
      <RenderIf condition={!isEditing}>
        {`${start.getFullYear()}/${start.getMonth() + 1}`} -{" "}
        {end ? `${end.getFullYear()}/${end.getMonth() + 1}` : "Present"}
      </RenderIf>
    </div>
  );
};
