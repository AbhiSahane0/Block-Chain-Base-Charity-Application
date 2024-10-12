import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CustomButton } from "./";
import { logo, menu, search, thirdweb } from "../assets";
import { navlinks } from "../constants";

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, settoogleDrawer] = useState(false);

  const address = "0xabc";

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mr-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px] ml-[80px]">
        {/* Search bar  */}
        <input
          type="text"
          placeholder="search for charity"
          className="flex w-full font-epilogue text-[16px] placeholder:text-[#4b5264] bg-transparent outline-none  text-white font-semibold"
        />
        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer ">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>
      <div className="sm:flex hidden flex-row justify-end gap-4">
        {/* Connect wallet or create charity button */}
        <CustomButton
          btnType="button"
          title={address ? "create a charity" : "connect"}
          styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          handleClick={() => {
            if (address) navigate("create-campaing");
            else "connect()";
          }}
        />
        {/* profile button */}
        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-[100px] bg-[#2c2f32] flex justify-center items-center ">
            <img
              src={thirdweb}
              alt="profile"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>
      {/* Small screen navigation */}
    </div>
  );
};

export default Navbar;
