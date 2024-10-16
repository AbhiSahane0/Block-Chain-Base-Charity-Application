import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useStateContext } from "../context";
import { CustomButton } from "./";
import { logo, menu, search, thirdweb } from "../assets";
import { navlinks } from "../constants";
import { ConnectWallet } from "@thirdweb-dev/react";

import { useConnect, metamaskWallet } from "@thirdweb-dev/react";
const metamaskConfig = metamaskWallet();

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, settoogleDrawer] = useState(false);
  // const { connect, address } = useStateContext();
  const [address, setaddress] = useState("");

  const connect = useConnect();

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
          handleClick={async () => {
            if (address) {
              navigate("create-charity");
            } else {
              try {
                const wallet = await connect(metamaskConfig);
                console.log("Connected to ", wallet);
                setaddress(await wallet.getAddress());
                console.log("Wallet Address: ", address);
              } catch (error) {
                console.error("Failed to connect to wallet:", error);
              }
            }
          }}
        />

        {/* profile button */}
        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-[100px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              src={thirdweb}
              alt="profile"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>
      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center rwelative ">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="profile"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => settoogleDrawer((prev) => !prev)}
        />
        <div
          className={`absolute top-[60px] right-0 left=0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && "bg-[3a3a43]"
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  settoogleDrawer(false);
                  navigate(link.name);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={address ? "create a charity" : "connect"}
              styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              handleClick={async () => {
                if (address) {
                  navigate("create-charity");
                } else {
                  try {
                    const wallet = await connect(metamaskConfig);
                    console.log("Connected to ", wallet);
                    setaddress(await wallet.getAddress());
                    console.log("Wallet Address: ", address);
                  } catch (error) {
                    console.error("Failed to connect to wallet:", error);
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
