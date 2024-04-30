import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter, RouteObject } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import AuthPage from './pages/AuthPage.tsx';
import './index.css';

const isAuthenticated = !!localStorage.getItem('token');

const PrivateRoute: React.FC<{ auth: React.ReactNode, element: React.ReactNode }> = ({ auth, element }) => {
  if (isAuthenticated) {
    return <>{element}</>;
  } else {
    return <>{auth}</>;
  }
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <PrivateRoute auth={<AuthPage />} element={<HomePage />} />
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