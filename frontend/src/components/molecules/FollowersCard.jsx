import React from 'react';
import { followers } from '@/data/followers';
import Button from '@/components/atoms/Button';

const FollowersCard = () => {
  return (
    <div className="w-full rounded-[0.7rem] gap-4 flex flex-col text-[13px]">
      <h3 className="font-bold text-[1.17rem]">Who is following you</h3>
      {followers.map((follower, id) => {
        return (
          <div key={id} className="flex justify-between items-center">
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
            <Button text="Follow" styles="h-8 pl-5 pr-5 self-end w-[30%]" />
          </div>
        );
      })}
    </div>
  );
};

export default FollowersCard;
