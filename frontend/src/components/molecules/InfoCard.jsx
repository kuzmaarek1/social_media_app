import React, { useState } from 'react';
import { UilPen } from '@iconscout/react-unicons';
import Button from '../atoms/Button';
import ProfileModal from '../molecules/ProfileModal';

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
      <Button text="Logout" styles="w-28 h-8 mt-24 self-end" />
    </div>
  );
};

export default InfoCard;
