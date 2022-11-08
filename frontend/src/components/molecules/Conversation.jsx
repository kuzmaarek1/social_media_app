import React, { useState, useEffect } from 'react';
import * as api from '@/api';

const Conversation = ({ data, currentUser }) => {
  const [userData, setUserData] = useState(null);
  const serverPublic = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await api.getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  if (userData)
    return (
      <>
        <div className="flex justify-between items-center p-2.5 rounded-lg hover:bg-[#80808038] hover:cursor-pointer">
          <div className="relative flex gap-2.5">
            <div className="w-4 h-4 absolute rounded-[50%] left-8 bg-[greenyellow]"></div>
            <img
              className="w-12 h-12"
              src={
                userData?.profilePicture
                  ? `${serverPublic}${userData?.profilePicture}`
                  : `${serverPublic}defaultProfile.png`
              }
              alt=""
            />
            <div className="text-[0.8rem] flex flex-col">
              <span className="font-bold">
                {`${userData?.firstName} ${userData?.lastName}`}
              </span>
              <span className="text-gray text-[13px]">Online</span>
            </div>
          </div>
        </div>
        <hr className="w-[85%] border-[0.1px] border-solid border-[#ececec]" />
      </>
    );
  else <></>;
};

export default Conversation;
