import { Login, Signup, Workflow } from '@/pages';
// import { useUserStore } from '@/stores';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

export default function MainRouter(): React.ReactNode {
  // const { auth, token } = useUserStore();
  const router = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/workflow', element: <Workflow /> },
    // { path: '/workflow', element: auth && token ? <Workflow /> : <Login /> },
  ]);
  return <RouterProvider router={router} />;
}
