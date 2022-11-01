import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainTemplates from '@/components/templates/MainTemplates';
import Profile from '@/pages/Profile';
import Auth from '@/pages/Auth';
import Home from '@/pages/Home';

const App = () => {
  const user =
    useSelector((state) => state.auth.authData) ||
    JSON.parse(localStorage.getItem('profile'));

  return (
    <>
      <MainTemplates>
        <Routes>
          {user ? (
            <>
              <Route path="/" exact element={<Navigate to="/home" replace />} />
              <Route path="/home" exact element={<Home />} />
              <Route path="/profile" exact element={<Profile />} />
            </>
          ) : (
            <Route path="*" exact element={<Navigate to="/auth" replace />} />
          )}
          <Route
            path="/auth"
            exact
            element={!user ? <Auth /> : <Navigate to="/home" replace />}
          />
        </Routes>
      </MainTemplates>
    </>
  );
};

export default App;
