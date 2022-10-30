import React from 'react';
import FollowersCard from '../molecules/FollowersCard';
import LogoSearch from '../molecules/LogoSearch';
import ProfileCard from '../molecules/ProfileCard';

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
