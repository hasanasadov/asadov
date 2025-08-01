"use client";
import { Button } from "../ui/button";
import RenderIf from "@/utils/RenderIf";
import Image from "next/image";

export default function PinInput({
  inputValue,
  setInputValue,
  onSubmitPin,
}: {
  inputValue: string[];
  setInputValue: React.Dispatch<React.SetStateAction<string[]>>;
  onSubmitPin: (pin: string) => void;
}) {
  const stack = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", ""];

  const handleClick = (digit: string) => {
    if (digit === "") return;
    setInputValue((prev) => {
      const next = [...prev];
      const emptyIndex = next.indexOf("");
      if (emptyIndex !== -1) {
        next[emptyIndex] = digit;
      }
      return next;
    });
  };

  return (
    <div className="text-center flex flex-col items-center gap-4">
      <div>
        <h1 className="text-xl mb-4">Enter Passcode</h1>
        <div className="text-3xl relative font-semibold mb-4 h-10 flex justify-center items-center">
          {inputValue.map((digit, idx) => (
            <div
              key={idx}
              className={
                `mx-1 w-3.5 h-3.5 inline-block  rounded-full border` +
                ` ${
                  digit
                    ? "bg-black dark:bg-white"
                    : "bg-transparent border-gray-400"
                }`
              }
            />
          ))}
        </div>
      </div>

      <div className=" flex items-center justify-center ">
        <div className="grid grid-cols-3 gap-5 w-[260px]">
          {stack.map((digit, idx) => (
            <Button
              key={idx - 1}
              onClick={() => {
                handleClick(digit);
              }}
              className={`!w-20 !h-20 flex card relative !items-center !justify-center text-3xl font-semibold !rounded-full !shadow-[inset_0_2px_4px_0_rgba(123,123,123,0.5)]  hover:!shadow-[inset_0_2px_20px_0_rgba(123,123,123,1)]`}
            >
              <span className="text-3xl">{digit}</span>
              <RenderIf condition={idx === 9}>
                <OkButton inputValue={inputValue} onSubmitPin={onSubmitPin} />
              </RenderIf>
              <RenderIf condition={idx === 11}>
                <BackSpaceButton setInputValue={setInputValue} />
              </RenderIf>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

const BackSpaceButton = ({
  setInputValue,
}: {
  setInputValue: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  return (
    <div
      onClick={() => {
        setInputValue((prev) => {
          const copy = [...prev];
          for (let i = copy.length - 1; i >= 0; i--) {
            if (copy[i] !== "") {
              copy[i] = "";
              break;
            }
          }
          return copy;
        });
      }}
      className=" absolute  h-full !w-20 left-0 flex items-center justify-center cursor-pointer"
    >
      <div className=" hidden dark:block">
        <Image
          src="/deleteWhite.png"
          alt="Backspace"
          className=""
          width={32}
          height={32}
        />
      </div>
      <div className="dark:hidden">
        <Image
          src="/deleteBlack.png"
          alt="Backspace"
          className=""
          width={32}
          height={32}
        />
      </div>
    </div>
  );
};

const OkButton = ({
  inputValue,
  onSubmitPin,
}: {
  inputValue: string[];
  onSubmitPin: (pin: string) => void;
}) => {
  const isPasscodeComplete = inputValue.every((digit) => digit !== "");
  const handleClick = () => {
    if (isPasscodeComplete) {
      const pin = inputValue.join("");
      onSubmitPin(pin); // Pass to layout
    }
  };

  return (
    <div
      onClick={handleClick}
      className="absolute h-full !w-20 left-0 flex items-center justify-center cursor-pointer"
    >
      <RenderIf condition={isPasscodeComplete}>
        <span>✓</span>
      </RenderIf>
    </div>
  );
};
