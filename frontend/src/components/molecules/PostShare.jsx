import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes,
} from '@iconscout/react-unicons';
import { uploadPost } from '@/actions/upload';
import { useImage } from '@/hooks/useImage';
import Button from '@/components/atoms/Button';
import Field from '@/components/molecules/Field';

const PostShare = ({ modal, setModalOpened }) => {
  const imageUpload = useImage();
  const imageRef = useRef();
  const desc = useRef();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const user = useSelector((state) => state.auth.authData.result);
  const loading = useSelector((state) => state.post.uploading);
  const serverPublic = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const resetShare = () => {
    setImage(null);
    desc.current.value = '';
    setModalOpened !== undefined && setModalOpened(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (image) {
      imageUpload.handleUploadImage(image);
      newPost.image = imageUpload.fileName.current;
    }
    dispatch(uploadPost(newPost));
    resetShare();
  };

  return (
    <div className="flex gap-4 bg-cardColor p-4 rounded-[1px]">
      <img
        className="w-12 h-12 rounded-[50%]"
        src={
          user.profilePicture
            ? `${serverPublic}${user.profilePicture}`
            : `${serverPublic}defaultProfile.png`
        }
        alt=""
      />
      <div className="w-[90%] flex flex-col gap-4">
        <Field
          styles="p-2.5 text-[17px] h-8"
          type="text"
          placeholder="What's happening"
          name="posts"
          label
          modal={modal}
          ref={desc}
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
          <Button
            text={loading ? 'Uploading...' : 'Share'}
            handleButtonClick={handleSubmit}
            styles="p-[5px] pl-5 pr-5 text-[15px] w-28 h-8 bg-button self-end"
            disabled={loading}
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
              src={URL.createObjectURL(image)}
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
