import React from 'react';
import Posts from './Posts';
import PostShare from './PostShare';

const PostSide = () => {
  return (
    <div className="flex flex-col gap-4 h-[100vh] overflow-auto">
      <PostShare />
      <Posts />
    </div>
  );
};

export default PostSide;
