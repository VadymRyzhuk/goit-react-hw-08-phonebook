import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import { useSelector } from 'react-redux';
import { selectAuthIsLoggedIn } from 'components/redux/Auth/AuthSlice.selectors';

export const Navigation = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  return (
    <header>
      <NavLink
        className={({ isActive }) =>
          `${css.link} ${isActive ? css.active : ''}`
        }
        to="/"
      >
        Home page
      </NavLink>

      {isLoggedIn ? (
        <NavLink
          className={({ isActive }) =>
            `${css.link} ${isActive ? css.active : ''}`
          }
          to="/contacts"
          end
        >
          Phonebook
        </NavLink>
      ) : (
        <>
          <NavLink
            className={({ isActive }) =>
              `${css.link} ${isActive ? css.active : ''}`
            }
            to="/register"
          >
            Registration
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `${css.link} ${isActive ? css.active : ''}`
            }
            to="/login"
            end
          >
            Login
          </NavLink>
        </>
      )}
    </header>
  );
};
