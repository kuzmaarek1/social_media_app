import React from 'react';

const Input = ({ type, placeholder, name, handleChange, children }) => {
  return (
    <div className="relative w-full flex justify-center align-center h-8">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border-none outline-none bg-inputColor p-5 rounded-lg flex-1"
        name={name}
        onChange={handleChange}
        required
      />
      {children}
    </div>
  );
};

export default Input;
