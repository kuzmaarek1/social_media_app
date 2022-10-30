import React from 'react';
import FollowersCard from '../molecules/FollowersCard';
import InfoCard from '../molecules/InfoCard';
import LogoSearch from '../molecules/LogoSearch';
const ProfileLeft = () => {
  return (
    <div className="flex flex-col gap-4 ">
      <LogoSearch />
      <InfoCard />
      <FollowersCard />
    </div>
  );
};

export default ProfileLeft;
