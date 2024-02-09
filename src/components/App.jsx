import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loader } from './Loader';
import { Navigation } from './Navigation/Navigation';
import { UserMenu } from './UserMenu';

const ContactsPage = lazy(() => import('pages/ContactsPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const HomePage = lazy(() => import('pages/HomePage'));

export const App = () => {
  return (
    <div>
      <header style={{ display: 'flex', gap: 20 }}>
        <Navigation />
        <UserMenu />
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/contacts" element={<ContactsPage />}></Route>
          </Routes>
        </Suspense>
      </main>
      <footer style={{ margin: 30 }}>Copyright</footer>
    </div>
  );
};
