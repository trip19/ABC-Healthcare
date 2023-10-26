import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import { selectLoggedInUser } from '../features/auth/authSlice';
import { resetCartAsync } from '../features/cart/cartSlice';
import { resetOrder } from '../features/order/orderSlice';
import { selectUserInfo } from '../features/user/userSlice';
function OrderSuccessPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const params = useParams();
  useEffect(() => {
    //reset cart
    dispatch(resetCartAsync(user));
    //reset currentOrder
    dispatch(resetOrder());
  }, [dispatch, user]);
  return (
    <>
      {!params.id && <Navigate to='/' replace={true}></Navigate>}
      <main className='grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8'>
        <div className='text-center'>
          <p className='text-lg font-bold text-red-500'>
            Thank you for ordering :)
          </p>
          <h1 className='mt-4 px-5 text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
            Your order has been placed. It will reach your shortly.
          </h1>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Link
              to='/'
              className='rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default OrderSuccessPage;
