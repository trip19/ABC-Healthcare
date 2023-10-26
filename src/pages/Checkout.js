import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link, Navigate } from 'react-router-dom';
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from '../features/cart/cartSlice';
import { useForm } from 'react-hook-form';
import {
  createOrderAsync,
  selectCurrentOrder,
} from '../features/order/orderSlice';
import {
  selectUserInfo,
} from '../features/user/userSlice';
import { selectLoggedInUser } from '../features/auth/authSlice';

function Checkout() {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const user = useSelector(selectUserInfo);
  const userRole = useSelector(selectLoggedInUser);
  const currentOrder = useSelector(selectCurrentOrder);
  const totalAmount = items.reduce(
    (amount, item) => item.medicine.price * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((totalQ, item) => item.quantity + totalQ, 0);
  const [paymentmethod, setPaymentMethod] = useState('cash');
  const userId = user.id;
  const handleQuantity = (e, item) => {
    const updateCart = { ...item, quantity: +e.target.value };
    delete updateCart['medicine'];
    delete updateCart['user'];
    dispatch(updateCartAsync(updateCart));
  };
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  // const handlePayment = (e) => {
  //   setPaymentMethod(e.target.value);
  // };


  const handleOrder = (e) => {
    const order = {
      items,
      totalAmount,
      totalItems,
      userId,
      status: 'pending',
    };
    console.log(order);
    dispatch(createOrderAsync(order));

    //clear cart
    //change the stock on server
  };
  return (
    <Fragment>
      {!items.length && <Navigate to='/' replace={true}></Navigate>}
      {currentOrder && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      <div className='mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8'>
          
          <div className='lg:col-span-2'>
            <div className='mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8'>
              <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                <h1 className='text-4xl my-2 mb-4 font-bold tracking-tight text-gray-900'>
                  Review and confirm your order
                </h1>
                <div className='flow-root'>
                  <ul role='list' className='-my-6 divide-y divide-gray-200'>
                    {items.map((item) => (
                      <li key={item.id} className='flex py-6'>
                        <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                          <img
                            src={item.medicine.image}
                            alt={item.medicine.name}
                            className='h-full w-full object-cover object-center'
                          />
                        </div>

                        <div className='ml-4 flex flex-1 flex-col'>
                          <div>
                            <div className='flex justify-between text-base font-medium text-gray-900'>
                              <h3>
                                <p className='ml-4'>{item.medicine.name}</p>
                              </h3>

                              <p className='ml-4'>
                                <span>&#8377;</span>
                                {item.medicine.price}
                              </p>
                            </div>
                          </div>
                          <div className='flex flex-1 items-end justify-between text-sm'>
                            <div className='text-gray-500'>
                              <label
                                htmlFor='quantity'
                                className='inline mr-5 text-sm font-medium leading-6 text-gray-900'
                              >
                                Quantity
                              </label>
                              <select
                                onChange={(e) => handleQuantity(e, item)}
                                value={item.quantity}
                              >
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                              </select>
                            </div>

                            <div className='flex'>
                              <button
                                type='button'
                                onClick={(e) => handleRemove(e, item.id)}
                                className='font-xl text-black hover:text-black border-7a9e9f'
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                <div className='flex justify-between my-2 text-base font-medium text-gray-900'>
                  <p>Subtotal</p>
                  <p>
                    <span>&#8377;</span> {totalAmount}
                  </p>
                </div>
                <div className='flex justify-between my-2 text-base font-medium text-gray-900'>
                  <p>Total Items in Cart</p>
                  <p>{totalItems} items</p>
                </div>
                <div className='mt-6'>
                  <div
                    onClick={handleOrder}
                    className='mx-60 py-2 flex bg-red-500 items-center justify-center rounded-md border border-transparent bg-red-500 hover:bg-red-500 text-base font-medium text-white shadow-sm'
                  >
                    Confirm order
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Fragment>
  );
}

export default Checkout;
