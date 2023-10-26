import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser, createUserAsync } from '../authSlice';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

export default function Signup() {
  /* eslint-disable */
  //const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const user = useSelector(selectLoggedInUser);

  return (
    <>
      {user && <Navigate to='/' replace={true}></Navigate>}
      <div className='flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Register
          </h2>
        </div>

        <div className='mt-3 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form
            noValidate
            className='space-y-6'
            onSubmit={handleSubmit((data) => {
              dispatch(
                createUserAsync({
                  firstName: data.firstName,
                  lastName: data.lastName,
                  userEmail: data.userEmail,
                  password: data.password,
                  //addresses: [],
                  roleId: 2,
                })
              );
            })}
          >
            <div>
              <label
                htmlFor='firstName'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                First Name
              </label>
              <div className='mt-2'>
                <input
                  id='firstName'
                  {...register('firstName', {
                    required: 'First name is required',
                  })}
                  type='text'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='lastName'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Last Name
              </label>
              <div className='mt-2'>
                <input
                  id='lastName'
                  {...register('lastName', {
                    required: 'Last name is required',
                  })}
                  type='text'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='userEmail'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='userEmail'
                  {...register('userEmail', {
                    required: 'email is required',
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: 'email not valid',
                    },
                  })}
                  type='email'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                />
                {errors.userEmail && (
                  <p className='text-red-500'>{errors.userEmail.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  {...register('password', {
                    required: 'password is required',
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `- at least 8 characters\n
                - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                - Can contain special characters`,
                    },
                  })}
                  type='password'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                />
                {errors.password && (
                  <p className='text-red-500'>{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Confirm Password
                </label>
              </div>
              <div className='mt-2'>
                <input
                  id='confirmPassword'
                  {...register('confirmPassword', {
                    required: 'confirm password is required',
                    validate: (value, formValues) =>
                      value === formValues.password ||
                      'password does not match',
                  })}
                  type='password'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                />
                {errors.confirmPassword && (
                  <p className='text-red-500'>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className='mt-3 text-center text-sm text-gray-500'>
            Already a member?{' '}
            <Link
              to='/login'
              className='font-semibold leading-6 text-black hover:text-black'
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
