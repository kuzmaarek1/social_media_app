import React from "react";
import Logo from "../img/logo.png";
import { UilSearch } from "@iconscout/react-unicons";

const LogoSearch = () => {
  return (
    <div className="flex gap-3">
      <img src={Logo} alt="" />
      <div className="flex bg-inputColor rounded-[10px] p-[5px]">
        <input
          className="bg-transparent border-none outline-none"
          type="text"
          placeholder="#Explore"
        />
        <div className="bg-search flex items-center justify-center rounded-[5px] p-[4px] text-[white] hover:cursor-pointer">
          <UilSearch />
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
