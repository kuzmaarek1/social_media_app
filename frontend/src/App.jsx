import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Home from './pages/Home';

const App = () => {
  const styles = 'w-[22rem] h-56 bg-[#a6ddf0] rounded-[50%] blur-[64px] absolute';
  const user =
    useSelector((state) => state.auth.authData) ||
    JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <div className="overflow-hidden text-black bg-[#f3f3f3] p-4">
        <div className={`${styles} right-0 top-[-18%]`}></div>
        <div className={`${styles} left-[-8rem] top-[36%]`}></div>
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
      </div>
    </BrowserRouter>
  );
};

export default App;
