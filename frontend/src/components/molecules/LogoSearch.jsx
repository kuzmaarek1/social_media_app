import React from 'react';
import Logo from '@/img/logo.png';
import { UilSearch } from '@iconscout/react-unicons';
import Input from '@/components/atoms/Input';

const LogoSearch = () => {
  return (
    <div className="relative h-9 flex gap-3">
      <img src={Logo} alt="" />
      <Input styles="h-[50%]" type="text" placeholder="#Explore" />
      <div className="absolute bg-search right-1 mt-1 flex items-center justify-center rounded-[5px] p-[4px] text-[white] hover:cursor-pointer">
        <UilSearch />
      </div>
    </div>
  );
};

export default LogoSearch;
