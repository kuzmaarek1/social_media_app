import React from 'react';
import PostSide from '@/components/organisms/PostSide';
import ProfileCard from '@/components/molecules/ProfileCard';
import ProfileLeft from '@/components/organisms/ProfileLeft';
import RightSide from '@/components/organisms/RightSide';

const Profile = () => {
  return (
    <div className="relative grid grid-cols-[18rem_auto_20rem] gap-4">
      <ProfileLeft />
      <div className="flex flex-col gap-4">
        <ProfileCard />
        <PostSide />
      </div>
      <RightSide />
    </div>
  );
};

export default Profile;
