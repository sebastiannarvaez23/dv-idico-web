import './index.css';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter, RouteObject, Navigate } from 'react-router-dom';
import { store } from './store/store';
import AuthPage from './pages/AuthPage.tsx';
import HomePage from './pages/HomePage.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import SettingsUserPage from './pages/SettingsUsersPage.tsx';

const isAuthenticated = !!localStorage.getItem('token');

const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  return isAuthenticated ? <>{element}</> : <Navigate to="/auth" />;
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <PrivateRoute element={<HomePage />} />
  },
  {
    path: '/settings/users',
    element: <PrivateRoute element={<SettingsUserPage />} />
  },
  {
    path: '/auth',
    element: <AuthPage />
  }
];

const router = createBrowserRouter(routes, {
  basename: '/dv-idico-web/'
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
