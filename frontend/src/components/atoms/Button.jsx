import React from 'react';

const Button = ({ text, styles, handleButtonClick, type }) => {
  return (
    <button
      className={`${styles} bg-button flex items-center justify-center text-white border-none rounded-lg duration-150 ease-out 
      hover:pointer hover:bg-transparent hover:border-solid hover:border-2 hover:border-orange`}
      onClick={handleButtonClick}
      type={type ? type : 'button'}
    >
      {text}
    </button>
  );
};

export default Button;
