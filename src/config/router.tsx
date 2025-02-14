import { Login, Signup } from '@/pages';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

export default function MainRouter(): React.ReactNode {
  const router = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
  ]);
  return <RouterProvider router={router} />;
}
