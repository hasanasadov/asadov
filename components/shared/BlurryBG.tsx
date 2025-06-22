import React from "react";

const BlurryBG = ({ className }: { className?: string }) => {
  return (
    <div
      className={`w-screen h-screen rounded-none ${className} absolute top-0 left-0 z-[-1]  opacity-[0.08] `}
      style={{
        backgroundImage:
          "url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')",
        backgroundSize: "64px",
        backgroundRepeat: "repeat",
      }}
    ></div>
  );
};

export default BlurryBG;
