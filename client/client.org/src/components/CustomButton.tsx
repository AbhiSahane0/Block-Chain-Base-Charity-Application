import React from "react";

interface buttonProps {
  btnType?: "submit" | "reset" | "button";
  title?: string;
  styles?: string;
  handleClick?: () => void;
}

function CustomButton({ btnType, title, styles, handleClick }: buttonProps) {
  return (
    <button
      type={btnType}
      className={` font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
}

export default CustomButton;
