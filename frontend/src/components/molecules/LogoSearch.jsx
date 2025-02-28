import React from 'react';
import Logo from '@/img/logo.png';
import { UilSearch } from '@iconscout/react-unicons';
import Field from '@/components/molecules/Field';

const LogoSearch = () => {
  return (
    <div className="relative w-full h-9 flex gap-3">
      <img src={Logo} alt="" />
      <Field styles="h-[50%]" type="text" placeholder="#Explore" />
      <div className="absolute bg-search right-[0.85rem] mt-1 flex items-center justify-center rounded-[5px] p-[4px] text-[white] hover:cursor-pointer">
        <UilSearch />
      </div>
    </div>
  );
};

export default LogoSearch;
