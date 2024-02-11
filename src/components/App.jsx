import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Loader } from './Loader';
import { Navigation } from './Navigation/Navigation';
import { UserMenu } from './UserMenu';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthIsLoggedIn } from './redux/Auth/AuthSlice.selectors';
import { apiRefreshUser } from './redux/Auth/authSlice';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';

const ContactsPage = lazy(() => import('pages/ContactsPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const HomePage = lazy(() => import('pages/HomePage'));

export const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch]);
  return (
    <div style={{ maxWidth: 1000, margin: `0 auto` }}>
      <header style={{ display: 'flex', gap: 20 }}>
        <Navigation />
        {isLoggedIn && <UserMenu />}
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<HomePage />}></Route>
            <Route
              path="/register"
              element={
                <RestrictedRoute>
                  <RegisterPage />
                </RestrictedRoute>
              }
            ></Route>
            <Route
              path="/login"
              element={
                <RestrictedRoute>
                  <LoginPage />
                </RestrictedRoute>
              }
            ></Route>
            <Route
              path="/contacts"
              element={
                <PrivateRoute>
                  <ContactsPage />
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </Suspense>
      </main>
      <footer style={{ margin: 30 }}>Copyright</footer>
    </div>
  );
};
