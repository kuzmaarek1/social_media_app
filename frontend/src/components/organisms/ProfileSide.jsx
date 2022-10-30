import React from 'react';
import FollowersCard from '@/components/molecules/FollowersCard';
import LogoSearch from '@/components/molecules/LogoSearch';
import ProfileCard from '@/components/molecules/ProfileCard';

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
