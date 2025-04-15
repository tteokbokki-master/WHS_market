import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import SignPage from '../pages/SignPage';
import ProductPage from '../pages/ProductPage';
import Mypage from '../pages/MyPage';
import RequireAuth from '../Components/RequireAuth';

const withAuth = (element: React.ReactNode) => <RequireAuth>{element}</RequireAuth>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: withAuth(<Home />) },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignPage /> },
      { path: 'product/:productId', element: withAuth(<ProductPage />) },
      { path: 'mypage', element: withAuth(<Mypage />) },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
