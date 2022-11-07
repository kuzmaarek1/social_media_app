import React from 'react';
import Label from '@/components/atoms/Label';
const FormField = ({
  type,
  placeholder,
  name,
  register,
  errors,
  children,
  required,
  watch,
}) => {
  const emptyInput = watch(name) === undefined || watch(name)?.length === 0;
  return (
    <div
      className={`relative w-full flex justify-center align-center h-8 ${
        type === 'file' ? 'h-[100%] md:h-[200%]' : ''
      }`}
    >
      <input
        type={type}
        className={`w-full bg-inputColor p-5 rounded-lg flex-1 peer text-sm
        ${
          !errors[name] &&
          'focus:border-orange focus:border-[0.1px] focus:border-solid focus:outline-none'
        }
        ${
          errors[name]
            ? 'border-red-600 border-[0.1px] border-solid outline-none'
            : emptyInput
            ? 'border-none outline-none'
            : 'border-orange border-[0.1px] border-solid'
        }`}
        name={name}
        id={name}
        {...register(name, {
          required,
        })}
      />
      <Label
        name={name}
        placeholder={placeholder}
        styles={`m-2 ${
          type === 'file'
            ? `${emptyInput ? 'mt-[-0.1rem] text-[0.8rem]' : 'mt-2 text-[0.65rem]'}`
            : ''
        }`}
        emptyInput={emptyInput}
        form
        errors={errors[name]}
      />
      {children}
      {errors[name] && (
        <span className="absolute text-[0.65rem] text-red-600 text-end w-full h-full top-10 right-0">
          {placeholder} is required
        </span>
      )}
    </div>
  );
};
export default FormField;
