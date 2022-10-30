import React from 'react';
import Comment from '../../img/comment.png';
import Share from '../../img/share.png';
import Heart from '../../img/like.png';
import NotLike from '../../img/notlike.png';

const Post = ({ data }) => {
  return (
    <div className="flex flex-col p-4 bg-cardColor rounded-2xl gap-4">
      <img className="w-full max-h-80 object-cover rounded-lg" src={data.img} alt="" />

      <div className="flex items-flex-start gap-6">
        <img src={data.liked ? Heart : NotLike} alt="" />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span className="text-gray text-[12px]">{data.likes} likes</span>
      <div>
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
