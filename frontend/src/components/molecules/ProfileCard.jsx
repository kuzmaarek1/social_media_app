import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileCard = ({ location }) => {
  const user = useSelector((state) => state.auth.authData.result);
  const { posts } = useSelector((state) => state.post);
  const serverPublic = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="flex flex-col bg-cardColor relative gap-4 rounded-3xl overflow-x-clip">
      <div className="flex flex-col items-center justify-center relative">
        <img
          className="w-full h-[17rem]"
          src={
            user.coverImage
              ? `${serverPublic}${user.coverImage}`
              : `${serverPublic}defaultCover.jpg`
          }
          alt=""
        />
        <img
          className="w-28  h-[7rem] absolute rounded-[50%] bottom-[-3rem] shadow-xl"
          src={
            user.profilePicture
              ? `${serverPublic}${user.profilePicture}`
              : `${serverPublic}defaultProfile.png`
          }
          alt=""
        />
      </div>

      <div className="flex flex-col items-center mt-12 gap-2.5">
        <span className="font-bold">
          {user.firstName} {''} {user.lastName}
        </span>
        <span>{user.worksAt ? user.worksAt : 'Write about yourself'}</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 ">
        <hr className="w-[85%] border border-solid border-hrColor bg-hrColor" />
        <div className="w-[80%] flex gap-4 items-center justify-around">
          <div className="flex flex-col gap-[0.4rem] items-center justify-center">
            <span className="font-bold">{user?.following?.length}</span>
            <span className="text-gray text-[13px]">Followings</span>
          </div>
          <div className="h-[150%] border-l-[2px] border-solid border-hrColor"></div>
          <div className="flex flex-col gap-[0.4rem] items-center justify-center">
            <span className="font-bold">{user?.followers?.length}</span>
            <span className="text-gray text-[13px]">Followers</span>
          </div>
          {location === 'profilePage' && (
            <>
              <div className="h-[150%] border-l-[2px] border-solid border-hrColor"></div>
              <div className="flex flex-col gap-[0.4rem] items-center justify-center">
                <span className="font-bold">
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span className="text-gray text-[13px]">Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === 'profilePage' ? (
        ''
      ) : (
        <span className="font-bold text-orange self-center mb-4 cursor-pointer">
          <Link className="text-inherit no-underline" to={`/profile/${user._id}`}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
