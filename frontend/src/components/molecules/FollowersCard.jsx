import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllUser } from '@/api/index.jsx';
import User from '@/components/molecules/User';

const FollowersCard = () => {
  const [persons, setPersons] = useState([]);
  const user = useSelector((state) => state.auth.authData.result);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, [user]);

  return (
    <div className="w-full rounded-[0.7rem] gap-4 flex flex-col text-[13px]">
      <h3 className="font-bold text-[1.17rem]">People you may know</h3>
      {persons.map((person, id) => {
        return person._id !== user._id && <User person={person} key={id} />;
      })}
    </div>
  );
};

export default FollowersCard;
