import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from '@/store/ReduxStore';

const AppProviders = ({ children }) => (
  <Router>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_PUBLIC_GOOGLE_API_TOKEN}>
      <Provider store={store}>{children}</Provider>
    </GoogleOAuthProvider>
  </Router>
);

export default AppProviders;
