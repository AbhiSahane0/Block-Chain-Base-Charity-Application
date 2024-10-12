import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logo, sun } from "../assets";
import { navlinks } from "../constants";

interface IconProps {
  styles?: string;
  imgUrl?: string;
  name?: string;
  isActive?: string;
  disabled?: boolean;
  handleClick?: () => void;
}

// custom icon component
function Icon({
  styles,
  imgUrl,
  name,
  isActive,
  disabled,
  handleClick,
}: IconProps) {
  return (
    <div
      className={`w-[48px] h-[48px] rounded-[10px] items-center ${
        isActive == name ? "bg-[#2c2f32]" : "" // isActive issue isActive !==name
      } flex justify-center item-center ${
        disabled ? "" : "cursor-pointer"
      } ${styles}`}
      onClick={handleClick}
    >
      {!isActive ? (
        <img src={imgUrl} alt="Fund_logo" className="w-1/2 h-1/2" />
      ) : (
        <img
          src={imgUrl}
          alt="Fund_Logo"
          className={`w-1/2 h-1/2 ${isActive !== name ? "grayscale" : ""}`}
        />
      )}
    </div>
  );
}

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setActive] = useState("dashboard");

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      {/* home icon button */}
      <Link to="/">
        <Icon
          styles="w-[52px] h-[52px] bg-[#2c2f32] items-center"
          imgUrl={logo}
        />
      </Link>
      {/* sidebar icons */}
      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>
        {/* dark or light mode icon */}
        <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;
