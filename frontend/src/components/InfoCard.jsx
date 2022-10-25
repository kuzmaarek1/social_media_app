import React, { useState } from 'react';
import { UilPen } from '@iconscout/react-unicons';
import ProfileModal from './ProfileModal';

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="flex flex-col gap-3 bg-cardColor rounded-2xl p-4 width-[100%]">
      <div className="flex items-center justify-center">
        <h4 className="font-bold text-[1rem]">Your Info</h4>
        <div className="hover:cursor-pointer">
          <UilPen width="2rem" height="1.2rem" onClick={() => setModalOpened(true)} />
          <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
        </div>
      </div>

      <div>
        <span>
          <b>Status </b>
        </span>
        <span>in Relationship</span>
      </div>
      <div>
        <span>
          <b>Lives in </b>
        </span>
        <span>Multan</span>
      </div>
      <div>
        <span>
          <b>Works at </b>
        </span>
        <span>Zainkeepscode inst</span>
      </div>
      <button className="w-28 h-8 mt-24 bg-button flex items-center justify-center text-white border-none rounded-lg self-end duration-150 ease-out hover:pointer hover:bg-transparent hover:border-solid hover:border-2 hover:border-orange">
        Logout
      </button>
    </div>
  );
};

export default InfoCard;
