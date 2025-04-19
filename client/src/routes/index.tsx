import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import SignPage from '../pages/SignPage';
import ProductPage from '../pages/ProductPage';
import Mypage from '../pages/MyPage';
import CreateProduct from '../pages/CreateProduct';
import AdminPage from '../pages/AdminPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignPage /> },
      { path: 'product/:productId', element: <ProductPage /> },
      { path: 'mypage', element: <Mypage /> },
      { path: 'createProduct', element: <CreateProduct /> },
      { path: 'admin', element: <AdminPage /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
