import React from 'react';
import Label from '@/components/atoms/Label';
const InputForm = ({ type, placeholder, name, handleChange, children }) => {
  return (
    <div className="relative w-full flex justify-center align-center h-8">
      <input
        type={type}
        className="w-full border-none outline-none bg-inputColor p-5 rounded-lg flex-1 peer
        focus:border-orange focus:border-[0.1px] focus:border-solid
        valid:border-orange valid:border-[0.1px] valid:border-solid"
        name={name}
        id={name}
        onChange={handleChange}
        required
      />
      <Label name={name} placeholder={placeholder} styles="m-2" />
      {children}
    </div>
  );
};

export default InputForm;
