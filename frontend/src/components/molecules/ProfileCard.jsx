import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileCard = ({ location }) => {
  const user = useSelector((state) => state.auth.authData.result);
  const { posts } = useSelector((state) => state.post);
  const serverPublic = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="h-[43%] flex flex-col bg-cardColor relative gap-4 rounded-3xl overflow-x-clip">
      <div className="relative">
        <img
          className="w-full h-[75%]"
          src={
            user.coverImage
              ? `${serverPublic}${user.coverImage}`
              : `${serverPublic}defaultCover.jpg`
          }
          alt=""
        />
        <img
          className="w-[20%] h-[50%] top-[50%] bottom-0 absolute right-0 left-0 m-auto rounded-[50%] shadow-xl"
          src={
            user.profilePicture
              ? `${serverPublic}${user.profilePicture}`
              : `${serverPublic}defaultProfile.png`
          }
          alt=""
        />
      </div>

      <div className="flex flex-col items-center gap-2.5">
        <span className="font-bold">
          {user.firstName} {''} {user.lastName}
        </span>
        <span>{user.worksAt ? user.worksAt : 'Write about yourself'}</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 ">
        <div className="w-[85%] h-[1.5px] border-l-[2px] border-solid border-hrColor bg-hrColor"></div>
        <div className="w-[80%] flex gap-4 items-center justify-around">
          <div className="flex flex-col gap-[0.4rem] items-center justify-center">
            <span className="font-bold">{user?.following?.length || 0}</span>
            <span className="text-gray text-[13px]">Followings</span>
          </div>
          <div className="h-[100%] border-l-[2px] border-solid border-hrColor"></div>
          <div className="flex flex-col gap-[0.4rem] items-center justify-center">
            <span className="font-bold">{user?.followers?.length || 0}</span>
            <span className="text-gray text-[13px]">Followers</span>
          </div>
          {location === 'profilePage' && (
            <>
              <div className="h-[100%] border-l-[2px] border-solid border-hrColor"></div>
              <div className="flex flex-col gap-[0.4rem] items-center justify-center">
                <span className="font-bold">
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span className="text-gray text-[13px]">Posts</span>
              </div>
            </>
          )}
        </div>
        <div className="w-[85%] h-[3%] border-l-[2px] border-solid border-hrColor bg-hrColor"></div>
      </div>
      {location === 'profilePage' ? (
        ''
      ) : (
        <span className="font-bold text-orange self-center mt-[-0.5rem] cursor-pointer">
          <Link className="text-inherit no-underline" to={`/profile/${user._id}`}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
