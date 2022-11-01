import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin, signup } from '@/actions/auth';
import { defaultValues } from '@/constants/defaultValuesForm';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const statusAuth = useSelector((state) => state.auth);

  const switchMode = () => {
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

  return {
    switchMode,
    handleShowPassword,
    onSubmit,
    googleSuccess,
    googleError,
    isSignup,
    confirmPassword,
    showPassword,
  };
};
