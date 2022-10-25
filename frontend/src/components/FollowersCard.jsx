import React from 'react';
import { followers } from '../data/followers';

const FollowersCard = () => {
  return (
    <div className="w-full rounded-[0.7rem] gap-4 flex flex-col text-[13px]">
      <h3 className="font-bold text-[1.17rem]">Who is following you</h3>
      {followers.map((follower, id) => {
        return (
          <div className="flex justify-between items-center">
            <div className="flex gap-2.5">
              <img
                className="w-[3.2rem] h-[3.2rem] rounded-[50%]"
                src={follower.img}
                alt=""
              />
              <div className="flex flex-col items-start justify-center">
                <span className="font-bold">{follower.name}</span>
                <span>@{follower.username}</span>
              </div>
            </div>
            <button className="h-8 pl-5 pr-5 bg-button flex items-center justify-center text-white border-none rounded-lg self-end duration-150 ease-out hover:pointer hover:bg-transparent hover:border-solid hover:border-2 hover:border-orange">
              Follow
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FollowersCard;
