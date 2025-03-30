import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import App from '../App';
import LoginPage from '../pages/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <App /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
