import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createHashRouter } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import AuthPage from './pages/AuthPage.tsx';

const router = createHashRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/auth',
    element: <AuthPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
