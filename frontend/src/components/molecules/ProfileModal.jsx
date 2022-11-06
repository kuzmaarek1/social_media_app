import { useEffect, useRef } from 'react';
import { Modal, useMantineTheme } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Button from '@/components/atoms/Button';
import FormField from '@/components/molecules/FormField';
import { updateUser } from '@/actions/auth';
import { useImage } from '@/hooks/useImage';

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();
  const image = useImage();
  const dispatch = useDispatch();
  const { _id } = data;
  const { password, ...other } = data;
  const defaultValues = useRef(null);

  useEffect(() => {
    defaultValues.current = other;
    reset(defaultValues.current);
  }, [data]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues.current,
  });

  const onSubimit = (e) => {
    if (e.coverImage[0]?.name) {
      image.handleUploadImage(e.coverImage[0]);
      e.coverImage = image.fileName.current;
    } else e.coverImage = '';

    if (e.profilePicture[0]?.name) {
      image.handleUploadImage(e.profilePicture[0]);
      e.profilePicture = image.fileName.current;
    } else e.profilePicture = '';

    console.log(e);
    dispatch(updateUser(_id, e));
    reset(defaultValues.current);
    setModalOpened(false);
  };
  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="100%"
      opened={modalOpened}
      onClose={() => {
        reset(defaultValues.current);
        setModalOpened(false);
      }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-16 relative">
        <form
          className="flex flex-col justify-center items-center gap-7 bg-cardColor rounded-2xl p-4"
          onSubmit={handleSubmit(onSubimit)}
        >
          <h3 className="text-[1.17rem] font-bold">Your info</h3>
          <div className="w-[90%] h-8 gap-2 grid grid-cols-2">
            <FormField
              name="firstName"
              placeholder="First Name"
              register={register}
              errors={errors}
              watch={watch}
              reset
            />
            <FormField
              name="lastName"
              placeholder="Last Name"
              register={register}
              errors={errors}
              watch={watch}
              reset
            />
          </div>
          <div className="w-[90%] h-8 flex gap-4">
            <FormField
              name="worksAt"
              placeholder="Works at"
              register={register}
              errors={errors}
              watch={watch}
              reset
            />
          </div>
          <div className="w-[90%] h-8 flex gap-4">
            <FormField
              name="livesIn"
              placeholder="Lives in"
              register={register}
              errors={errors}
              watch={watch}
              reset
            />
            <FormField
              name="country"
              placeholder="Country"
              register={register}
              errors={errors}
              watch={watch}
              reset
            />
          </div>
          <div className="w-[90%] h-8 flex gap-4">
            <FormField
              name="relationship"
              placeholder="Relationship Status"
              register={register}
              errors={errors}
              watch={watch}
              reset
            />
          </div>
          <div className="w-[90%] h-8 flex gap-4 flex-col md:flex-row">
            <div className="w-full flex flex-row">
              <FormField
                type="file"
                placeholder="Profile Image"
                name="profilePicture"
                register={register}
                errors={errors}
                watch={watch}
                reset
              />
            </div>
            <div className="w-full flex flex-row">
              <FormField
                type="file"
                placeholder="Cover Image"
                name="coverImage"
                register={register}
                errors={errors}
                watch={watch}
                reset
              />
            </div>
          </div>
          <Button type="submit" text="Update" styles="w-24 h-8 self-end mt-24 md:mt-5" />
        </form>
      </div>
    </Modal>
  );
};

export default ProfileModal;
