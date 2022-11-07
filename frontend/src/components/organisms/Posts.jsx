import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '@/actions/posts';
import Post from '@/components/molecules/Post';
import { useParams } from 'react-router-dom';

const Posts = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector((state) => state.auth.authData.result);
  let { posts, loading, uploading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [uploading, user]);

  if (params.id) posts = posts.filter((post) => post.userId === params.id);
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
