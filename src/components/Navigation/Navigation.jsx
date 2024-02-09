import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

export const Navigation = () => {
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
      <NavLink
        className={({ isActive }) =>
          `${css.link} ${isActive ? css.active : ''}`
        }
        to="/contacts"
        end
      >
        Phonebook
      </NavLink>
    </header>
  );
};
