import React from 'react';
import Posts from '@/components/organisms/Posts';
import PostShare from '@/components/molecules/PostShare';

const PostSide = () => {
  return (
    <div className="flex flex-col gap-4 h-[100vh] overflow-auto">
      <PostShare />
      <Posts />
    </div>
  );
};

export default PostSide;
