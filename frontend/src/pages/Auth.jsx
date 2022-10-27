import React, { useState } from 'react';
import Logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { signin, signup } from '../actions/auth';

const Auth = () => {
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    console.log(form);
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(form, navigate));
    } else {
      dispatch(signin(form, navigate, null));
    }
  };

  const googleSuccess = async (response) => {
    dispatch(signin(null, navigate, response));
  };

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-[100vh] flex flex-col sm:flex-row items-center justify-center gap-16 relative">
      <div className="flex items-center justify-center gap-8">
        <img className="w-16 h-16" src={Logo} alt="" />
        <div>
          <h1 className="text-[3rem] font-bold bg-button bg-repeat bg-clip-text text-transparent">
            ZKC Media
          </h1>
          <h6 className="text-[0.85rem]">Explore the ideas throughout the world</h6>
        </div>
      </div>
      <div>
        <form
          className="w-[80vw] sm:w-[40vw] flex flex-col justify-center items-center gap-8 bg-cardColor rounded-2xl p-4"
          onSubmit={handleSubmit}
        >
          <h3 className="text-[1.17rem] font-bold">{isSignup ? 'Sign Up' : 'Sign In'}</h3>
          {isSignup && (
            <div className="w-full flex justify-center align-center g-4 h-8">
              <div className="w-full h-full gap-2 grid grid-cols-2">
                <input
                  className="h-8 border-none outline-none bg-inputColor p-5 rounded-lg flex-1"
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                />
                <input
                  className="h-8 border-none outline-none bg-inputColor p-5 rounded-lg flex-1"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          <div className="w-full flex justify-center align-center g-4 h-8">
            <input
              type="text"
              placeholder="Email"
              className="border-none outline-none bg-inputColor p-5 rounded-lg flex-1"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="w-full relative flex justify-center align-center g-4 h-8">
            <input
              type={showPassword ? 'text' : 'password'}
              className="border-none outline-none bg-inputColor p-5 rounded-lg flex-1"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <div
              className="absolute inset-y-0 right-0 mt-2 pr-3 flex items-center justify-center text-sm leading-5"
              onClick={handleShowPassword}
            >
              <svg
                className={`h-5 text-gray-700 ${showPassword ? 'hidden' : 'block'}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                ></path>
              </svg>
              <svg
                className={`h-5 text-gray-700 ${showPassword ? 'block' : 'hidden'}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path
                  fill="currentColor"
                  d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                ></path>
              </svg>
            </div>
          </div>
          {isSignup && (
            <div className="w-full relative flex justify-center align-center g-4 h-8">
              <input
                type={showPassword ? 'text' : 'password'}
                className="border-none outline-none bg-inputColor p-5 rounded-lg flex-1"
                placeholder="Repeat Password"
                name="confirmPassword"
                onChange={handleChange}
              />
              <div
                className="absolute inset-y-0 right-0 mt-2 pr-3 flex items-center justify-center text-sm leading-5"
                onClick={handleShowPassword}
              >
                <svg
                  className={`h-5 text-gray-700 ${showPassword ? 'hidden' : 'block'}`}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                  ></path>
                </svg>
                <svg
                  className={`h-5 text-gray-700 ${showPassword ? 'block' : 'hidden'}`}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="currentColor"
                    d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                  ></path>
                </svg>
              </div>
            </div>
          )}
          <div className="w-full flex align-center justify-center m-[-0.75rem] h-8">
            <button
              type="submit"
              className="w-24 h-8 bg-button flex items-center justify-center text-white border-none rounded-lg self-end duration-150 ease-out hover:pointer hover:bg-transparent hover:border-solid hover:border-2 hover:border-orange"
            >
              {isSignup ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
          <div className="w-full flex align-center justify-center m-[-0.75rem] h-8">
            <GoogleLogin
              className="rounded-lg"
              logo_alignment="center"
              onSuccess={googleSuccess}
              onError={googleError}
              size="large"
              shape="circle"
            />
          </div>
          <div className="w-full flex justify-center align-center mt-[-0.75rem] g-4 h-8">
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
