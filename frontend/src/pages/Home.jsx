import React from 'react';
import PostSide from '@/components/organisms/PostSide';
import ProfileSide from '@/components/organisms/ProfileSide';
import RightSide from '@/components/organisms/RightSide';

const Home = () => {
  return (
    <div className="relative grid grid-cols-[18rem_auto_20rem] gap-4">
      <ProfileSide />
      <PostSide />
      <RightSide />
    </div>
  );
};

export default Home;
