import React from 'react';
import { Link } from 'react-router-dom';
import { UilSetting } from '@iconscout/react-unicons';
import Home from '@/img/home.png';
import Noti from '@/img/noti.png';
import Comment from '@/img/comment.png';

const NavIcons = () => {
  return (
    <div className="mt-4 flex justify-between">
      <Link to="/home">
        <img className="w-6 h-6" src={Home} alt="" />
      </Link>
      <UilSetting />
      <img className="w-6 h-6" src={Noti} alt="" />
      <Link to="/chat">
        <img className="w-6 h-6" src={Comment} alt="" />
      </Link>
    </div>
  );
};

export default NavIcons;
