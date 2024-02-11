import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiLogoutUser } from './redux/Auth/authSlice';
import {
  selectAuthUserData,
  selectAuthIsLoading,
} from './redux/Auth/AuthSlice.selectors';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectAuthUserData);
  const isLoading = useSelector(selectAuthIsLoading);
  const handleLogout = () => dispatch(apiLogoutUser());

  const userEmail = userData?.email ?? 'Could’t get user email';
  return (
    <div>
      <p>{userEmail}</p>
      <button
        style={{ padding: 8 }}
        onClick={handleLogout}
        disabled={isLoading}
        type="button"
      >
        Logout
      </button>
    </div>
  );
};
