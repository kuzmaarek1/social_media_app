import React, { useState } from 'react';
import Home from '../img/home.png';
import Noti from '../img/noti.png';
import Comment from '../img/comment.png';
import { UilSetting } from '@iconscout/react-unicons';
import TrendCard from './TrendCard';
import ShareModal from './ShareModal';

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="flex flex-col gap-8">
      <div className="mt-4 flex justify-between">
        <img className="w-6 h-6" src={Home} alt="" />
        <UilSetting />
        <img className="w-6 h-6" src={Noti} alt="" />
        <img className="w-6 h-6" src={Comment} alt="" />
      </div>
      <TrendCard />
      <button
        className="h-12 w-[80%] self-center bg-button flex items-center justify-center text-white border-none rounded-lg duration-150 ease-out hover:pointer hover:bg-transparent hover:border-solid hover:border-2 hover:border-orange"
        onClick={() => setModalOpened(true)}
      >
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
