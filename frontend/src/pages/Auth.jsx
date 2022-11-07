import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/hooks/useAuth';
import FormField from '@/components/molecules/FormField';
import LogoForm from '@/components/molecules/LogoForm';
import Button from '@/components/atoms/Button';
import { authValues } from '@/constants/defaultValuesForm';
import ShowPasswordButton from '@/components/atoms/ShowPasswordButton';

const Auth = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: authValues });
  const statusAuth = useSelector((state) => state.auth);
  const auth = useAuth();

  return (
    <div className="h-[100vh] flex flex-col sm:flex-row items-center justify-center gap-16 relative">
      <LogoForm />
      <div>
        <form
          className="w-[80vw] sm:w-[40vw] flex flex-col justify-center items-center gap-7 bg-cardColor rounded-2xl p-4"
          onSubmit={handleSubmit(auth.onSubmit)}
        >
          <h3 className="text-[1.17rem] font-bold">
            {auth.isSignup ? 'Sign Up' : 'Sign In'}
          </h3>
          {auth.isSignup && (
            <div className="w-full h-8 gap-2 grid grid-cols-2">
              <FormField
                type="text"
                name="firstName"
                placeholder="First Name"
                register={register}
                errors={errors}
                watch={watch}
                required
              />
              <FormField
                type="text"
                name="lastName"
                placeholder="Last Name"
                register={register}
                errors={errors}
                watch={watch}
                required
              />
            </div>
          )}
          <FormField
            type="text"
            name="email"
            placeholder="Email"
            register={register}
            errors={errors}
            watch={watch}
            required
          />
          <div
            className={`w-full h-8 gap-2 grid ${
              auth.isSignup ? 'grid-cols-2' : 'grid-cols-1'
            }`}
          >
            <FormField
              type={auth.showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              register={register}
              errors={errors}
              watch={watch}
              required
            >
              <ShowPasswordButton
                handleShowPassword={auth.handleShowPassword}
                showPassword={auth.showPassword}
              />
            </FormField>
            {auth.isSignup && (
              <>
                <FormField
                  type={auth.showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Repeat Password"
                  register={register}
                  errors={errors}
                  watch={watch}
                  required
                >
                  <ShowPasswordButton
                    handleShowPassword={auth.handleShowPassword}
                    showPassword={auth.showPassword}
                  />
                  {!auth.confirmPassword && !errors.confirmPassword && (
                    <span className="absolute text-[0.65rem] text-red-600 text-end w-full h-full top-10 right-0">
                      Confirm password is not same
                    </span>
                  )}
                </FormField>
              </>
            )}
            {statusAuth.errors && (
              <span className="text-[0.65rem] text-red-600 text-start w-full h-full top-10 right-0">
                Nieprawidłowe dane
              </span>
            )}
          </div>
          <div className="w-full flex align-center justify-center m-[-0.75rem] mt-[0.01rem] h-8">
            <Button
              type="submit"
              styles="w-24 h-8"
              disabled={statusAuth.loading}
              text={
                statusAuth.loading ? 'Loading...' : auth.isSignup ? 'SignUp' : 'Login'
              }
            />
          </div>
          <div className="w-full flex align-center justify-center m-[-0.75rem] mt-[0.01rem] h-8">
            <GoogleLogin
              className="rounded-lg"
              logo_alignment="center"
              onSuccess={auth.googleSuccess}
              onError={auth.googleError}
              size="large"
              shape="circle"
            />
          </div>
          <div className="w-full flex justify-center align-center h-8">
            <button
              type="reset"
              className="text-[12px]"
              onClick={() => {
                reset(authValues);
                auth.switchMode();
              }}
            >
              {auth.isSignup
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
