import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Comment from '@/img/comment.png';
import Share from '@/img/share.png';
import Heart from '@/img/like.png';
import NotLike from '@/img/notlike.png';
import { likePost } from '@/actions/posts';
import { useEffect } from 'react';

const Post = ({ data }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData.result);
  const [likes, setLikes] = useState(data?.likes);
  const hasLikedPost = likes?.find((like) => like === user._id);

  useEffect(() => {
    setLikes(data?.likes);
  }, [data]);

  const handleLike = () => {
    dispatch(likePost(data._id, user._id));
    if (hasLikedPost) {
      setLikes(data.likes.filter((id) => id !== user._id));
    } else {
      setLikes([...data.likes, user._id]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return hasLikedPost ? (
        <>
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }
    return <>0 Like</>;
  };
  return (
    <div className="flex flex-col p-4 bg-cardColor rounded-2xl gap-4">
      <img
        className="w-full max-h-80 object-cover rounded-lg"
        src={
          data.image ? `${import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER}${data.image}` : ''
        }
        alt=""
      />
      <div className="flex items-flex-start gap-6">
        <img
          className="cursor-pointer"
          src={likes.find((like) => like === user._id) ? Heart : NotLike}
          alt=""
          onClick={handleLike}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>
      <span className="text-gray text-[12px]">
        <Likes />
      </span>
      <div>
        <span>
          {data?.firstName ? (
            <b>
              {data.firstName} {''}
              {data.lastName}
            </b>
          ) : (
            <b>
              {' '}
              {user.firstName} {''}
              {user.lastName}
            </b>
          )}
        </span>
        <span className="p-1"> {data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
