import { Modal, useMantineTheme } from '@mantine/core';
import Button from '@/components/atoms/Button';
import Field from '@/components/molecules/Field';

const ProfileModal = ({ modalOpened, setModalOpened }) => {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="90%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="flex flex-col justify-center items-center gap-9 text-xs sm:text-base">
        <h3>Your info</h3>
        <div className="w-[90%] h-8 flex gap-4">
          <Field name="FirstName" placeholder="First Name" styles="h-[138%]" label />
          <Field name="LastName" placeholder="Last Name" label styles="h-[138%]" />
        </div>
        <div className="w-[90%] h-8 flex gap-4">
          <Field name="worksAt" placeholder="Works at" label styles="h-[138%]" />
        </div>
        <div className="w-[90%] h-8 flex gap-4">
          <Field name="livesIn" placeholder="Lives in" label styles="h-[138%]" />
          <Field name="Country" placeholder="Country" label styles="h-[138%]" />
        </div>
        <div className="w-[90%] h-8 flex gap-4">
          <Field
            name="relationshipStatus"
            placeholder="Relationship Status"
            label
            styles="h-[138%]"
          />
        </div>
        <div className="w-[90%] h-8 flex gap-4 flex-col md:flex-row">
          <div className="w-full flex flex-row">
            <label className="mr-4" for="profileImg">
              Profile Image
            </label>
            <input type="file" id="profileImg" name="profileImg" />
          </div>
          <div className="w-full flex flex-row">
            <label className="mr-4" for="coverImg">
              Cover Image
            </label>
            <input type="file" id="coverImage" name="coverImg" />
          </div>
        </div>
        <Button text="Update" styles=" w-24 h-8 self-end mt-4 sm:mt-0" />
      </form>
    </Modal>
  );
};

export default ProfileModal;
