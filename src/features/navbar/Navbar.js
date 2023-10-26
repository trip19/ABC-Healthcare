import { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectItems } from '../cart/cartSlice';
import { selectLoggedInUser } from '../auth/authSlice';
import { selectUserInfo } from '../user/userSlice';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  admin: '',
};
const navigation = [
  //{ name: 'Products', link: '/', User: true },
  //{ name: 'Products', link: '/', guest: true },
  { name: 'Manage Products', link: '/admin', Admin: true },
  // { name: 'Orders', link: '/admin/orders', Admin: true },
  { name: 'Manage Users', link: '/admin/users', Admin: true },
  { name: 'Manage Categories', link: '/admin/categories', Admin: true },
];
const userNavigation = [
  // { name: 'My Orders', link: '/orders', User: true },
  { name: 'Sign out', link: '/logout', User: true },
  { name: 'Log In', link: '/login', guest: true },
  { name: 'Sign Up', link: '/signup', guest: true },
  { name: 'Sign out', link: '/logout', Admin: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Navbar({ children }) {
  const items = useSelector(selectItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);
  const isLoggedIn = loggedInUser !== null;

  const userRole = isLoggedIn ? loggedInUser.role : 'guest';
  return (
    <div className='min-h-full'>
      <Disclosure as='nav' className='bg-gray-800'>
        {({ open }) => (
          <>
            <div className='fixed top-0 left-0 w-full z-50 bg-gray-800 text-white mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
              <div className='flex h-16 items-center justify-between'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <Link to='/'>
                      <div className='flex items-center'>
                        <p className='text-white text-2xl ml-4'>PharmaSelect</p>
                      </div>
                    </Link>
                  </div>
                  <div className='hidden md:block'>
                    <div className='ml-10 flex items-baseline space-x-4'>
                      {navigation.map((item) =>
                        item[userRole] ? (
                          <Link
                            key={item.name}
                            to={item.link}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                        ) : null
                      )}
                    </div>
                  </div>
                </div>
                <div className='hidden md:block'>
                  <div className='ml-4 flex items-center md:ml-6'>
                    <Link to='/cart'>
                      <button
                        type='button'
                        className='relative rounded-full px-4 bg-red-500 hover:bg-red-500 p-1 text-white hover:text-white '
                      >
                        View Cart
                      </button>
                    </Link>
                    {items.length > 0 && (
                      <span className='inline-flex items-center rounded-md mb-7 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10'>
                        {items.length}
                      </span>
                    )}
                    
                    {/* Profile dropdown */}
                    <Menu as='div' className='relative ml-3'>
                      <div>
                        <Menu.Button className='relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                          <span className='absolute -inset-1.5' />
                          <span className='sr-only'>Open user menu</span>
                          {userRole === 'admin' ? (
                            <img
                              width='48'
                              height='48'
                              src='https://www.citypng.com/public/uploads/preview/transparent-hd-white-male-user-profile-icon-11637133256qticy7lqml.png?v=2023080416'
                              alt='administrator-male'
                            />
                          ) : (
                            <img
                              width='48'
                              height='48'
                              src='https://www.citypng.com/public/uploads/preview/transparent-hd-white-male-user-profile-icon-11637133256qticy7lqml.png?v=2023080416'
                              alt='test-account'
                            />
                          )}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          {userNavigation.map((item) =>
                            item[userRole] ? (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.link}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ) : null
                          )}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className='-mr-2 flex md:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button className='relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                    <span className='absolute -inset-0.5' />
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className='md:hidden'>
              <div className='space-y-1 px-2 pb-3 pt-2 sm:px-3'>
                {navigation.map((item) =>
                  item[userRole] ? (
                    <Disclosure.Button
                      key={item.name}
                      as='a'
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ) : null
                )}
              </div>
              <div className='border-t border-gray-700 pb-3 pt-4'>
                <div className='flex items-center px-5'>
                  <div className='flex-shrink-0'>
                    {userRole === 'admin' ? (
                      <img
                        width='48'
                        height='48'
                        src='https://www.citypng.com/public/uploads/preview/transparent-hd-white-male-user-profile-icon-11637133256qticy7lqml.png?v=2023080416'
                        alt='administrator-male'
                      />
                    ) : (
                      <img
                        width='48'
                        height='48'
                        src='https://png.pngtree.com/element_our/20190529/ourmid/pngtree-user-icon-image_1187018.jpg'
                        alt='test-account'
                      />
                    )}
                  </div>
                  
                </div>
                <div className='mt-3 space-y-1 px-2'>
                  <Link to='/cart'>
                    <button
                      type='button'
                      className='relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                    >
                      <span className='absolute -inset-1.5' />
                      <span className='sr-only'>View Shopping Cart</span>
                      <ShoppingCartIcon
                        className='h-6 w-6'
                        aria-hidden='true'
                      />
                    </button>
                  </Link>
                  {items.length > 0 && (
                    <span className='inline-flex items-center rounded-md mb-7 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10'>
                      {items.length}
                    </span>
                  )}
                </div>
                <div className='mt-3 space-y-1 px-2'>
                  {userNavigation.map((item) =>
                    item[userRole] ? (
                      <Disclosure.Button
                        key={item.name}
                        className='block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'
                      >
                        {({ active }) => (
                          <Link
                            to={item.link}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-400'
                            )}
                          >
                            {item.name}
                          </Link>
                        )}
                      </Disclosure.Button>
                    ) : null
                  )}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <main>
        <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-white'>
          {children}
        </div>
      </main>
    </div>
  );
}

export default Navbar;
