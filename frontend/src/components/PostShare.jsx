import React, { useState, useRef } from 'react';
import ProfileImage from '../img/profileImg.jpg';
import {
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes,
} from '@iconscout/react-unicons';

const PostShare = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };
  return (
    <div className="flex gap-4 bg-cardColor p-4 rounded-[1px]">
      <img className="w-12 h-12 rounded-[50%]" src={ProfileImage} alt="" />
      <div className="w-[90%] flex flex-col gap-4">
        <input
          className="bg-inputColor rounded-[10px] p-2.5 text-[17px] border-none outline-none"
          type="text"
          placeholder="What's happening"
        />
        <div className="flex justify-around">
          <div
            className="p-[5px] pl-2.5 pr-2.5 rounded-[10px] flex justify-center items-center text-photo hover:cursor-pointer"
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="p-[5px] pl-2.5 pr-2.5 rounded-[10px] flex justify-center items-center text-video hover:cursor-pointer">
            <UilPlayCircle />
            Video
          </div>{' '}
          <div className="p-[5px] pl-2.5 pr-2.5 rounded-[10px] flex justify-center items-center text-location hover:cursor-pointer">
            <UilLocationPoint />
            Location
          </div>{' '}
          <div className="p-[5px] pl-2.5 pr-2.5 rounded-[10px] flex justify-center items-center text-shedule hover:cursor-pointer">
            <UilSchedule />
            Shedule
          </div>
          <button className="p-[5px] pl-5 pr-5 text-[12px] w-28 h-8 bg-button flex items-center justify-center text-white border-none rounded-lg self-end duration-150 ease-out hover:pointer hover:bg-transparent hover:border-solid hover:border-2 hover:border-orange">
            Share
          </button>
          <div className="hidden">
            <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
          </div>
        </div>
        {image && (
          <div className="relative">
            <UilTimes
              className="absolute r-4 t-2 cursor-pointer"
              onClick={() => setImage(null)}
            />
            <img
              className="w-full max-h-80 rounded-lg object-cover"
              src={image.image}
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
