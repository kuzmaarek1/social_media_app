import React from 'react';
import FollowersCard from './FollowersCard';
import LogoSearch from './LogoSearch';
import ProfileCard from './ProfileCard';

const ProfileSide = () => {
  return (
    <div className="flex flex-col items-center gap-4 overflow-auto ">
      <LogoSearch />
      <ProfileCard />
      <FollowersCard />
    </div>
  );
};

export default ProfileSide;
