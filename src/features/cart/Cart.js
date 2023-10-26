import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteItemFromCartAsync,
  selectCartStatus,
  selectItems,
  updateCartAsync,
} from './cartSlice';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link, Navigate } from 'react-router-dom';
import { Blocks } from 'react-loader-spinner';
import Modal from '../common/Modal';

export default function Cart() {
  /* eslint-disable */
  const items = useSelector(selectItems);
  const status = useSelector(selectCartStatus);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(null);
  const totalAmount = items.reduce(
    (amount, item) => item.medicine.price * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((totalQ, item) => item.quantity + totalQ, 0);
  const handleQuantity = (e, item) => {
    const updateCart = { ...item, quantity: +e.target.value };
    delete updateCart['medicine'];
    delete updateCart['user'];
    dispatch(updateCartAsync(updateCart));
  };
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };
  return (
    <Fragment>
      {!items.length && <Navigate to='/' replace={true}></Navigate>}
      <div className='mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
          <h1 className='text-4xl my-2 mb-4 font-bold tracking-tight text-gray-900'>
            Cart
          </h1>
          <div className='flow-root'>
            {status === 'loading' ? (
              <Blocks
                visible={true}
                height='80'
                width='80'
                ariaLabel='blocks-loading'
                wrapperStyle={{}}
                wrapperClass='blocks-wrapper'
              />
            ) : null}
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
                          {/* <a href={item.href}>{item.title}</a> */}
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
                        <Modal
                          title={`Delete ${item.medicine.name}`}
                          message='Are you sure you want to remove this item from the Cart'
                          modOption='Delete'
                          cancelOption='Cancel'
                          modAction={(e) => handleRemove(e, item.id)}
                          cancelAction={() => setOpenModal(null)}
                          showModal={openModal === item.id}
                        ></Modal>
                        <button
                          type='button'
                          onClick={(e) => {
                            setOpenModal(item.id);
                          }}
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
            <p>Subtotal:</p>
            <p>
              <span>&#8377;</span> {totalAmount}
            </p>
          </div>
          <div className='mt-6'>
            <Link
              to='/checkout'
              className='mx-60 py-2 flex bg-red-500 items-center justify-center rounded-md border border-transparent bg-red-500 hover:bg-red-500 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
            >
              Checkout
            </Link>
          </div>
          
        </div>
      </div>
    </Fragment>
  );
}


