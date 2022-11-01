import React from 'react';
import Logo from '@/img/logo.png';

const LogoForm = () => {
  return (
    <div className="flex items-center justify-center gap-8">
      <img className="w-20 h-16" src={Logo} alt="" />
      <div>
        <h1 className="text-[3rem] font-bold bg-button bg-repeat bg-clip-text text-transparent">
          ZKC Media
        </h1>
        <h6 className="text-[0.85rem]">Explore the ideas throughout the world</h6>
      </div>
    </div>
  );
};

export default LogoForm;
