import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import App from '../App';
import LoginPage from '../pages/LoginPage';
import SignPage from '../pages/SignPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <App /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignPage /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
