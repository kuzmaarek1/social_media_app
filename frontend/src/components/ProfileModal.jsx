import { Modal, useMantineTheme } from '@mantine/core';

const ProfileModal = ({ modalOpened, setModalOpened }) => {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="flex flex-col justify-center items-center gap-8">
        <h3>Your info</h3>
        <div className="w-[90%] h-8 flex gap-4">
          <input
            type="text"
            className="border-none outline-none bg-inputColor p-5 rounded-lg flex-1"
            name="FirstName"
            placeholder="First Name"
          />
          <input
            type="text"
            className="border-none outline-none bg-inputColor p-5 rounded-lg flex-1"
            name="LastName"
            placeholder="Last Name"
          />
        </div>
        <div className="w-[90%] h-8 flex gap-4">
          <input
            type="text"
            className="border-none outline-none bg-inputColor p-5 rounded-lg flex-1"
            name="worksAT"
            placeholder="Works at"
          />
        </div>
        <div className="w-[90%] h-8 flex gap-4">
          <input
            type="text"
            className="border-none outline-none bg-inputColor p-5 rounded-lg flex-1"
            name="livesIN"
            placeholder="LIves in"
          />

          <input
            type="text"
            className="border-none outline-none bg-inputColor p-5 rounded-lg flex-1"
            name="Country"
            placeholder="Country"
          />
        </div>
        <div className="w-[90%] h-8 flex gap-4">
          <input
            type="text"
            className="border-none outline-none bg-inputColor p-5 rounded-lg flex-1"
            placeholder="RelationShip Status"
          />
        </div>
        <div className="w-[90%] h-8 flex gap-4">
          Profile Image
          <input type="file" name="profileImg" />
          Cover Image
          <input type="file" name="coverImg" />
        </div>
        <button className=" w-24 h-8 bg-button flex items-center justify-center text-white border-none rounded-lg self-end duration-150 ease-out hover:pointer hover:bg-transparent hover:border-solid hover:border-2 hover:border-orange">
          Update
        </button>
      </form>
    </Modal>
  );
};

export default ProfileModal;
