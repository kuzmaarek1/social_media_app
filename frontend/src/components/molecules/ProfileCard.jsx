import React from 'react';
import Cover from '../../img/cover.jpg';
import Profile from '../../img/profileImg.jpg';

const ProfileCard = () => {
  const ProfilePage = true;
  return (
    <div className="flex flex-col bg-cardColor relative gap-4 rounded-3xl overflow-x-clip">
      <div className="flex flex-col items-center justify-center relative">
        <img className="w-full" src={Cover} alt="" />
        <img
          className="w-24 absolute rounded-[50%] bottom-[-3rem] shadow-xl"
          src={Profile}
          alt=""
        />
      </div>

      <div className="flex flex-col items-center mt-12 gap-2.5">
        <span className="font-bold">Zendaya MJ</span>
        <span>Senior UI/UX Designer</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 ">
        <hr className="w-[85%] border border-solid border-hrColor bg-hrColor" />
        <div className="w-[80%] flex gap-4 items-center justify-around">
          <div className="flex flex-col gap-[0.4rem] items-center justify-center font-bold">
            <span>6,890</span>
            <span>Followings</span>
          </div>
          <div className="h-[150%] border-l-[2px] border-solid border-hrColor"></div>
          <div className="flex flex-col gap-[0.4rem] items-center justify-center text-gray  text-[13px]">
            <span>1</span>
            <span>Followers</span>
          </div>

          {ProfilePage && (
            <>
              <div className="h-[150%] border-l-[2px] border-solid border-hrColor"></div>
              <div className="flex flex-col gap-[0.4rem] items-center justify-center">
                <span>3</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {ProfilePage ? (
        ''
      ) : (
        <span className="font-bold text-orange self-center mb-4 cursor-pointer">
          My Profile
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
