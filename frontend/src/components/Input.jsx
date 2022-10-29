import React from 'react';

const Input = ({ placeholder, name, styles, children }) => {
  return (
    <>
      <input
        type="text"
        className={`w-full border-none outline-none bg-inputColor p-5 rounded-lg flex-1 ${styles}`}
        placeholder={placeholder}
        name={name}
      />
      {children}
    </>
  );
};

export default Input;
