import React from 'react';
import Label from '@/components/atoms/Label';

const Field = React.forwardRef(({ placeholder, name, styles, children, label }, ref) => {
  return (
    <div className="w-full h-8 relative">
      <input
        type="text"
        placeholder={label ? '' : placeholder}
        className={`w-full border-none outline-none bg-inputColor p-5 rounded-lg flex-1 ${styles} peer
        focus:border-orange focus:border-[0.1px] focus:border-solid 
        valid:border-orange valid:border-[0.1px] valid:border-solid`}
        name={name}
        id={name}
        ref={ref}
        required
      />
      {label && <Label name={name} placeholder={placeholder} styles={`m-2.5`} />}
      {children}
    </div>
  );
});

export default Field;
