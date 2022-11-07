import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '@/constants/actionTypes';
import { useNavigate, useParams } from 'react-router-dom';
import { UilPen } from '@iconscout/react-unicons';
import * as api from '@/api/index.jsx';
import Button from '@/components/atoms/Button';
import ProfileModal from '@/components/molecules/ProfileModal';

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.authData.result);
  const [profileUser, setProfileUser] = useState({});

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (params.id === user._id) setProfileUser(user);
      else {
        const profileUser = await api.getUser(params.id);
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);

  const handleLogOut = () => {
    dispatch({ type: LOGOUT });
    navigate('/auth');
    setProfileUser(null);
  };

  return (
    <div className="h-[27%] flex flex-col gap-3 bg-cardColor rounded-2xl p-4 width-[100%]">
      <div className="flex items-center justify-center">
        <h4 className="font-bold text-[1rem]">
          {params.id === user._id ? 'Your Info' : 'Profile Into'}
        </h4>
        <div className="hover:cursor-pointer">
          {params.id === user._id ? (
            <>
              <UilPen width="2rem" height="1.2rem" onClick={() => setModalOpened(true)} />
              <ProfileModal
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
                data={user}
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>
      <div>
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.livesIn}</span>
      </div>
      <div>
        <span>
          <b>Country </b>
        </span>
        <span>{profileUser.country}</span>
      </div>
      <div>
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>
      {params.id === user._id && (
        <Button
          handleButtonClick={handleLogOut}
          text="Logout"
          styles="w-28 h-8 mt-20 self-end"
        />
      )}
    </div>
  );
};

export default InfoCard;
