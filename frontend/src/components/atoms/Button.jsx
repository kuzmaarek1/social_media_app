import React from 'react';

const Button = ({ text, styles, handleButtonClick, type, disabled }) => {
  return (
    <button
      className={`${styles} bg-button flex items-center justify-center text-white border-none rounded-lg duration-150 ease-out 
      hover:pointer hover:bg-none hover:border-solid hover:border-2 hover:border-orange hover:text-orange disabled:opacity-50 disabled:pointer-events-none`}
      onClick={handleButtonClick}
      type={type ? type : 'button'}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
