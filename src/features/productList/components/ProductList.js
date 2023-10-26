import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllCategoriesAsync,
  fetchAllProductsAsync,
  fetchProductsByFiltersAsync,
  selectAllCategories,
  selectAllProducts,
  selectProductListStatus,
  selectTotalItems,
} from '../productSlice';
import { Fragment } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from '@heroicons/react/20/solid';
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { ITEMS_PER_PAGE } from '../../../app/constant';
import Pagination from '../../common/Pagination';
import { Blocks } from 'react-loader-spinner';
const sortOptions = [
  //{ name: 'Alphabetically', sort: 'rating', order: 'desc', current: false },
  { name: 'Price: Low to High', sort: 'price', order: 'asc', current: false },
  { name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductList() {
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const medicines = useSelector(selectAllProducts);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState('');
  const totalItems = useSelector(selectTotalItems);
  const categories = useSelector(selectAllCategories);
  const status = useSelector(selectProductListStatus);

  const filters = [
    {
      id: 'category',
      name: 'Category',
      options: categories,
    },
  ];

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    //TODO:on server it should support multiple categories
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }

    setFilter(newFilter);
  };
  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
  };
  const handlePage = (page) => {
    setPage(page);
  };

  // useEffect(() => {
  //   const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
  //   dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
  // }, [dispatch, filter, sort, page]);

  // useEffect(() => {
  //   setPage(1);
  // }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
    dispatch(fetchAllCategoriesAsync());
  }, []);

  return (
    <div>
      <div>
        <div className=''>
          <div>
            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
              <Dialog
                as='div'
                className='relative z-40 lg:hidden'
                onClose={setMobileFiltersOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter='transition-opacity ease-linear duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='transition-opacity ease-linear duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='fixed inset-0 bg-black bg-opacity-25' />
                </Transition.Child>

                <div className='fixed inset-0 z-40 flex'>
                  <Transition.Child
                    as={Fragment}
                    enter='transition ease-in-out duration-300 transform'
                    enterFrom='translate-x-full'
                    enterTo='translate-x-0'
                    leave='transition ease-in-out duration-300 transform'
                    leaveFrom='translate-x-0'
                    leaveTo='translate-x-full'
                  >
                    <Dialog.Panel className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl'>
                      <div className='flex items-center justify-between px-4'>
                        <h2 className='text-lg font-medium text-gray-900'>
                          Filters
                        </h2>
                        <button
                          type='button'
                          className='-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400'
                          onClick={() => setMobileFiltersOpen(false)}
                        >
                          <span className='sr-only'>Close menu</span>
                          <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                        </button>
                      </div>

                      {/* Filters */}
                      <form className='bg-black mt-4 border-t border-gray-200'>
                        {filters.map((section) => (
                          <Disclosure
                            as='div'
                            key={section.id}
                            className='bg-black border-t border-gray-200 px-4 py-6'
                          >
                            {({ open }) => (
                              <>
                                <h3 className='-mx-2 -my-3 flow-root'>
                                  <Disclosure.Button className='flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500'>
                                    <span className='font-medium text-gray-900'>
                                      {section.name}
                                    </span>
                                    <span className='ml-6 flex items-center'>
                                      {open ? (
                                        <MinusIcon
                                          className='h-5 w-5'
                                          aria-hidden='true'
                                        />
                                      ) : (
                                        <PlusIcon
                                          className='h-5 w-5'
                                          aria-hidden='true'
                                        />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className='pt-6'>
                                  <div className='space-y-6'>
                                    {section.options
                                      .filter((option) => !option.deleted)
                                      .map((option, optionIdx) => (
                                        <div
                                          key={option.id}
                                          className='flex items-center'
                                        >
                                          <input
                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                            name={`${section.id}[]`}
                                            defaultValue={option.medicineType}
                                            type='checkbox'
                                            //defaultChecked={option.checked}
                                            onClick={(e) => {
                                              if (e.target.checked) {
                                                setCategory(e.target.value);
                                              } else {
                                                setCategory('');
                                              }
                                            }}
                                            className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                          />
                                          <label
                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                            className='ml-3 min-w-0 flex-1 text-gray-500'
                                          >
                                            {option.medicineType}
                                          </label>
                                        </div>
                                      ))}
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>

            <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 '>
              <div className='flex items-baseline justify-between border-b border-gray-200 pb-2 pt-10'>
                {/* Search input */}
                <div className='mb-4 mt-4 '>
                  <input
                    type='text'
                    placeholder='Search for medicines...'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className='border border-gray-800 p-2 w-full rounded-md lg:col-span-3'
                  />
                </div>

                <div className='flex items-center'>
                  <Menu as='div' className='relative inline-block text-left'>
                    <div>
                      <Menu.Button className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
                        Sort
                        <ChevronDownIcon
                          className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                          aria-hidden='true'
                        />
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
                      <Menu.Items className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <div className='py-1'>
                          {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <p
                                  onClick={(e) => {
                                    handleSort(e, option);
                                  }}
                                  className={classNames(
                                    option.current
                                      ? 'font-medium text-gray-900'
                                      : 'text-gray-500',
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm'
                                  )}
                                >
                                  {option.name}
                                </p>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>

              <section
                aria-labelledby='products-heading'
                className='pb-24 pt-6'
              >
                <div className=' grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2'>
                  {/* Filters */}
                  <form className='bg-eeF5DB hidden lg:block'>
                    {filters.map((section) => (
                      <Disclosure
                        as='div'
                        key={section.id}
                        className='border-b border-gray-200 py-6'
                      >
                        {({ open }) => (
                          <>
                            <h3 className='-mb-3 flow-root'>
                              <Disclosure.Button className='flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500'>
                                <span className='font-medium text-gray-900'>
                                  {section.name}
                                </span>
                                <span className='ml-6 flex items-center'>
                                  {open ? (
                                    <MinusIcon
                                      className='h-5 w-5'
                                      aria-hidden='true'
                                    />
                                  ) : (
                                    <PlusIcon
                                      className='h-5 w-5'
                                      aria-hidden='true'
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className='pt-6'>
                              <div className='space-y-4'>
                                {section.options
                                  .filter((option) => !option.deleted)
                                  .map((option, optionIdx) => (
                                    <div
                                      key={option.id}
                                      className='flex items-center'
                                    >
                                      <input
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.medicineType}
                                        type='checkbox'
                                        defaultChecked={option.checked}
                                        onClick={(e) => {
                                          if (e.target.checked) {
                                            setCategory(e.target.value);
                                          } else {
                                            setCategory('');
                                          }
                                        }}
                                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                      />
                                      <label
                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                        className='ml-3 text-sm text-gray-600'
                                      >
                                        {option.medicineType}
                                      </label>
                                    </div>
                                  ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>

                  {/* Product grid */}
{/* Product grid */}
<div className='lg:col-span-3'>
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
  <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
    {medicines
      .filter((product) => {
        if (searchInput === '') {
          return product;
        } else if (
          product.name
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        ) {
          return product;
        }
      })
      .filter((product) => {
        if (category === '') {
          return product;
        } else if (
          product.category.medicineType === category
        ) {
          return product;
        }
      })
      .sort((a, b) => {
        if (sort._sort === 'price') {
          if (sort._order === 'asc') {
            return a.price - b.price;
          } else if (sort._order === 'desc') {
            return b.price - a.price;
          }
        }
        return 0;
      })
      .map((product) =>
        product.deleted ? null : (
          <div key={product.id} className='group relative p-2 rounded-md shadow-md'>
            <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none  lg:h-60'>
              <img
                src={product.image}
                alt={product.name}
                className='h-full w-full object-cover object-center lg:h-full lg:w-full'
              />
            </div>
            <div className='mt-4 flex justify-between'>
              <div>
                <h3 className='text-sm font-medium text-black'>
                  {product.name}
                </h3>
              </div>
              <p className='text-sm font-medium text-gray-900'>
                <span>&#8377;</span>
                {product.price}
              </p>
            </div>
            {product.isAvailable ? null : (
              <div>
                <p className='text-sm text-red-400'>
                  Out of stock
                </p>
              </div>
            )}
            <Link to={`/product-detail/${product.id}`} className="block mt-2 text-center text-white bg-red-500 hover:bg-red-700 px-2 py-2 rounded fw-3">
              View Details
            </Link>
          </div>
        )
      )}
  </div>
</div>
                </div>
              </section>
              {/* Pagination starts */}
              {/* <Pagination
                page={page}
                setPage={setPage}
                handlePage={handlePage}
                totalItems={totalItems}
              ></Pagination> */}
            </main>
          </div>
        </div>

        {/* Product List */}
      </div>
    </div>
  );
}
