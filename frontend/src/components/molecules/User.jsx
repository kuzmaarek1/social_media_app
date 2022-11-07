import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@/components/atoms/Button';
import { followUser, unFollowUser } from '@/actions/auth';

const User = ({ person }) => {
  const serverPublic = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  const user = useSelector((state) => state.auth.authData.result);
  const [following, setFollowing] = useState(person.followers.includes(user._id));
  const dispatch = useDispatch();
  const handleFollow = () => {
    following
      ? dispatch(unFollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2.5">
        <img
          className="w-[3.2rem] h-[3.2rem] rounded-[50%]"
          src={
            person.profilePicture
              ? `${serverPublic}${person.profilePicture}`
              : `${serverPublic}defaultProfile.png`
          }
          alt=""
        />
        <div className="flex flex-col items-start justify-center">
          <span className="font-bold">
            {person.firstName} {''} {person.lastName}
          </span>
          <span className="text-[0.6rem]">@{person.email}</span>
        </div>
      </div>
      <Button
        handleButtonClick={handleFollow}
        text={following ? 'Unfollow' : 'Follow'}
        styles={`h-8 pl-5 pr-5 self-end w-[30%] ${following ? 'bg-unfollow' : ' '}`}
      />
    </div>
  );
};

export default User;
