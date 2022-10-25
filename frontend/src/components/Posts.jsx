import React from 'react';
import { posts } from '../data/posts';
import Post from './Post';

const Posts = () => {
  return (
    <div className="flex flex-col gap-1rem">
      {posts.map((post, id) => {
        return <Post data={post} id={id} />;
      })}
    </div>
  );
};

export default Posts;
