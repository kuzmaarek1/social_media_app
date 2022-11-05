import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '@/actions/posts';
import Post from '@/components/molecules/Post';

const Posts = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData.result);
  const { posts, loading, uploading } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [uploading]);
  return (
    <div className="flex flex-col gap-[1rem]">
      {loading
        ? 'Fetching Posts'
        : posts?.map((post, id) => {
            return <Post key={id} data={post} />;
          })}
    </div>
  );
};

export default Posts;
