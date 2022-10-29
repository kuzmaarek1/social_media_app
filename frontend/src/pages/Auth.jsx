import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import Logo from '../img/logo.png';
import { signin, signup } from '../actions/auth';
import Input from '../components/Input';
import Button from '../components/Button';
import ShowPasswordButton from '../components/ShowPasswordButton';

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
            <div className="w-full h-8 gap-2 grid grid-cols-2">
              <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                handleChange={handleChange}
              />
              <Input
                type="text"
                name="lastName"
                placeholder="Last Name"
                handleChange={handleChange}
              />
            </div>
          )}
          <Input
            type="text"
            name="email"
            placeholder="Email"
            handleChange={handleChange}
          />
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            handleChange={handleChange}
          >
            <ShowPasswordButton
              handleShowPassword={handleShowPassword}
              showPassword={showPassword}
            />
          </Input>
          {isSignup && (
            <>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Repeat Password"
                handleChange={handleChange}
              >
                <ShowPasswordButton
                  handleShowPassword={handleShowPassword}
                  showPassword={showPassword}
                />
              </Input>
            </>
          )}
          <div className="w-full flex align-center justify-center m-[-0.75rem] h-8">
            <Button
              type="submit"
              styles="w-24 h-8"
              text={isSignup ? 'Sign Up' : 'Sign In'}
            />
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
          <div className="w-full flex justify-center align-center mt-[-0.75rem] h-8">
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
