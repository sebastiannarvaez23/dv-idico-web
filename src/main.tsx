import React from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate, RouterProvider, createHashRouter, RouteObject } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import AuthPage from './pages/AuthPage.tsx';
import './index.css';

const isAuthenticated = !!localStorage.getItem('token');

const PrivateRoute: React.FC<{ path: string, element: React.ReactNode }> = ({ element }) => {
  const navigate = useNavigate();
  if (isAuthenticated) {
    return <>{element}</>;
  } else {
    navigate('/');
    return null;
  }
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <PrivateRoute path="/" element={<HomePage />} />
  },
  {
    path: '/auth',
    element: <AuthPage />
  }
];

const router = createHashRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);