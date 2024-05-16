import { useNavigate, RouterProvider, createHashRouter, RouteObject } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/HomePage.tsx';
import AuthPage from './pages/AuthPage.tsx';
import './index.css';

const isAuthenticated = !!localStorage.getItem('token');

const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const navigate = useNavigate();
  if (isAuthenticated) {
    navigate('/');
    return <>{element}</>;
  } else {
    navigate('/auth');
    return null;
  }
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <PrivateRoute element={<HomePage />} />
  },
  {
    path: '/auth',
    element: <AuthPage />
  }
];

const router = createHashRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);