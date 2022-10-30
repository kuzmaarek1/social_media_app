import React, { useState, useRef } from 'react';
import {
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes,
} from '@iconscout/react-unicons';
import Button from '../atoms/Button';
import ProfileImage from '../../img/profileImg.jpg';
import Input from '../atoms/Input';

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
        <Input styles="p-2.5 text-[17px]" type="text" placeholder="What's happening" />
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
          <Button
            text="Share"
            styles="p-[5px] pl-5 pr-5 text-[15px] w-28 h-8 bg-button self-end"
          />
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
