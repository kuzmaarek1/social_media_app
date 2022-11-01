import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { GoogleLogin } from '@react-oauth/google';
import Logo from '@/img/logo.png';
import { signin, signup } from '@/actions/auth';
import InputForm from '@/components/atoms/InputForm';
import Button from '@/components/atoms/Button';
import { defaultValues } from '@/constants/defaultValuesForm';
import ShowPasswordButton from '@/components/atoms/ShowPasswordButton';

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const statusAuth = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });
  const [isSignup, setIsSignup] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const switchMode = () => {
    reset(defaultValues);
    statusAuth.errors = null;
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
    setConfirmPassword(true);
  };
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit = (form) => {
    setConfirmPassword(true);
    if (isSignup) {
      form.password === form.confirmPassword
        ? dispatch(signup(form, navigate))
        : setConfirmPassword(false);
    } else {
      dispatch(signin(form, navigate, null));
    }
  };

  const googleSuccess = async (response) => {
    dispatch(signin(null, navigate, response));
  };

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

  return (
    <div className="h-[100vh] flex flex-col sm:flex-row items-center justify-center gap-16 relative">
      <div className="flex items-center justify-center gap-8">
        <img className="w-20 h-16" src={Logo} alt="" />
        <div>
          <h1 className="text-[3rem] font-bold bg-button bg-repeat bg-clip-text text-transparent">
            ZKC Media
          </h1>
          <h6 className="text-[0.85rem]">Explore the ideas throughout the world</h6>
        </div>
      </div>
      <div>
        <form
          className="w-[80vw] sm:w-[40vw] flex flex-col justify-center items-center gap-7 bg-cardColor rounded-2xl p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-[1.17rem] font-bold">{isSignup ? 'Sign Up' : 'Sign In'}</h3>
          {isSignup && (
            <div className="w-full h-8 gap-2 grid grid-cols-2">
              <InputForm
                type="text"
                name="firstName"
                placeholder="First Name"
                register={register}
                errors={errors}
                watch={watch}
                required
              />
              <InputForm
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
          <InputForm
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
              isSignup ? 'grid-cols-2' : 'grid-cols-1'
            }`}
          >
            <InputForm
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              register={register}
              errors={errors}
              watch={watch}
              required
            >
              <ShowPasswordButton
                handleShowPassword={handleShowPassword}
                showPassword={showPassword}
              />
            </InputForm>
            {isSignup && (
              <>
                <InputForm
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Repeat Password"
                  register={register}
                  errors={errors}
                  watch={watch}
                  required
                >
                  <ShowPasswordButton
                    handleShowPassword={handleShowPassword}
                    showPassword={showPassword}
                  />
                  {!confirmPassword && !errors.confirmPassword && (
                    <span className="absolute text-[0.65rem] text-red-600 text-end w-full h-full top-10 right-0">
                      Confirm password is not same
                    </span>
                  )}
                </InputForm>
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
              text={statusAuth.loading ? 'Loading...' : isSignup ? 'SignUp' : 'Login'}
            />
          </div>
          <div className="w-full flex align-center justify-center m-[-0.75rem] mt-[0.01rem] h-8">
            <GoogleLogin
              className="rounded-lg"
              logo_alignment="center"
              onSuccess={googleSuccess}
              onError={googleError}
              size="large"
              shape="circle"
            />
          </div>
          <div className="w-full flex justify-center align-center h-8">
            <button type="reset" className="text-[12px]" onClick={switchMode}>
              {isSignup
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
