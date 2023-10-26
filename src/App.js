import React, { useEffect } from 'react';
import logo from './logo.svg';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import Protected from './features/auth/components/Protected';
import AdminOrdersPage from './pages/AdminOrdersPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPassowrdPage';
import AdminProductFormPage from './pages/AdminProductForm';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminCategoriesPage from './pages/AdminCategoriesPage';
import AdminCategoryFormPage from './pages/AdminCategoryForm';
import { authenicated, selectLoggedInUser } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import './App.css';
import { useSelector } from 'react-redux';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PageNoTFound from './pages/404';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import AdminHome from './pages/AdminHome';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
};
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
  },
  {
    path: '/admin',
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/signup',
    element: <SignupPage></SignupPage>,
  },
  {
    path: '/cart',
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: '/checkout',
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: '/product-detail/:id',
    element: <ProductDetailPage></ProductDetailPage>,
  },
  {
    path: '/admin/product-detail/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/category-form',
    element: (
      <ProtectedAdmin>
        <AdminCategoryFormPage></AdminCategoryFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/category-form/edit/:id',
    element: (
      <ProtectedAdmin>
        <AdminCategoryFormPage></AdminCategoryFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <ProtectedAdmin>
        <AdminUsersPage></AdminUsersPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/categories',
    element: (
      <ProtectedAdmin>
        <AdminCategoriesPage></AdminCategoriesPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/order-success/:id',
    element: <OrderSuccessPage></OrderSuccessPage>,
  },
  {
    path: '/orders',
    element: <UserOrdersPage></UserOrdersPage>,
  },
  {
    path: '/logout',
    element: <Logout></Logout>,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: '*',
    element: <PageNoTFound></PageNoTFound>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchItemsByUserIdAsync(user));
      dispatch(fetchLoggedInUserAsync(user));
    }
  }, [dispatch, user]);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token !== undefined && token !== null) {
      dispatch(authenicated({ token }));
    }
  }, [dispatch]);

  return (
    <div className='App bg-white'>
      <Provider template={AlertTemplate} {...options}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
