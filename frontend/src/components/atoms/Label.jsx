import React from 'react';

const Label = ({ name, placeholder, styles, form, emptyInput, errors }) => {
  return (
    <label
      htmlFor={name}
      className={`absolute w-30% left-0 ${styles} pl-4 duration-300 transform 
         peer-focus:translate-x-[3%] peer-focus:translate-y-[-110%] peer-focus:text-[0.65rem] peer-focus:tracking-wider peer-focus:rounded peer-focus:pl-2 peer-focus:pr-2  
         peer-focus:mt-2
         ${errors ? 'peer-focus:bg-red-500' : 'peer-focus:bg-input'}
        ${
          form
            ? !emptyInput &&
              'translate-x-[3%] translate-y-[-110%] text-[0.65rem] tracking-wider bg-input rounded pl-2 pr-2'
            : 'peer-valid:mt-2 peer-valid:translate-x-[3%] peer-valid:translate-y-[-110%] peer-valid:text-[0.65rem] peer-valid:tracking-wider peer-valid:bg-input peer-valid:rounded peer-valid:pl-2 peer-valid:pr-2'
        }`}
    >
      {placeholder}
    </label>
  );
};

export default Label;
