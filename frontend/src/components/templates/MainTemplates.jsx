import React from 'react';

const MainTemplates = ({ children }) => {
  const styles = 'w-[22rem] h-56 bg-[#a6ddf0] rounded-[50%] blur-[64px] absolute';
  return (
    <div className="overflow-hidden text-black bg-[#f3f3f3] p-4">
      <div className={`${styles} right-0 top-[-18%]`}></div>
      <div className={`${styles} left-[-8rem] top-[36%]`}></div>
      {children}
    </div>
  );
};
export default MainTemplates;
