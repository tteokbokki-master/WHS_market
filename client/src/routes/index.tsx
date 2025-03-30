import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import SignPage from '../pages/SignPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignPage /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
