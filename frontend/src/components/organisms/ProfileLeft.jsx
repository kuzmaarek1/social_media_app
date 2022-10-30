import React from 'react';
import FollowersCard from '@/components/molecules/FollowersCard';
import InfoCard from '@/components/molecules/InfoCard';
import LogoSearch from '@/components/molecules/LogoSearch';
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
