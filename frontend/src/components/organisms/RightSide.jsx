import React, { useState } from 'react';
import Button from '@/components/atoms/Button';
import TrendCard from '@/components/molecules/TrendCard';
import ShareModal from '@/components/molecules/ShareModal';
import NavIcons from '@/components/molecules/NavIcons';

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="flex flex-col gap-8">
      <NavIcons />
      <TrendCard />
      <Button
        text="Share"
        styles="h-12 w-[80%] self-center"
        handleButtonClick={() => setModalOpened(true)}
      />
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
