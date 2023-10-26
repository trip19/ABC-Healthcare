import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllCategoriesAsync,
  fetchAllProductsAsync,
  fetchProductsByFiltersAsync,
  selectAllCategories,
  selectAllProducts,
  selectTotalItems,
} from '../../productList/productSlice';
import { Fragment } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PencilIcon,
  EyeIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
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
const sortOptions = [
  { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
  { name: 'Price: Low to High', sort: 'price', order: 'asc', current: false },
  { name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminProductList() {
  const dispatch = useDispatch();
  const medicines = useSelector(selectAllProducts);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const totalItems = useSelector(selectTotalItems);
  const categories = useSelector(selectAllCategories);
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handleSort = (option) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
    console.log(sort);
  };

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, []);

  return (
    <>
      {/* component */}
      <div className='mt-20 lg:col-span-3'>
        <div>
          <Link
            to='/admin/product-form'
            className='rounded-md mx-9 my-5 bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
          >
            Add Medicine
          </Link>
        </div>
      </div>
      <div className='overflow-x-auto'>
          <div className='w-full'>
            <div className='bg-white shadow-md rounded my-6'>
              <table className='min-w-max w-full table-auto'>
                <thead>
                  <tr className='cursor-pointer bg-gray-800 text-white uppercase text-sm leading-normal'>
                    <th
                      className='py-3 px-6 text-left'
                      onClick={(e) =>
                        handleSort({
                          sort: 'id',
                          order: sort._order == 'asc' ? 'desc' : 'asc',
                        })
                      }
                    >
                      Id
                      {sort._sort === 'id' &&
                        (sort._order === 'asc' ? (
                          <ArrowUpIcon className='w-4 h-4 inline'></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className='w-4 h-4 inline'></ArrowDownIcon>
                        ))}
                    </th>
                    <th className='py-3 px-6 text-center'>Medicine Name</th>
                    <th
                      className='py-3 px-6 text-left'
                      onClick={(e) =>
                        handleSort({
                          sort: 'price',
                          order: sort._order == 'asc' ? 'desc' : 'asc',
                        })
                      }
                    >
                      Price
                      {sort._sort === 'price' &&
                        (sort._order === 'asc' ? (
                          <ArrowUpIcon className='w-4 h-4 inline'></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className='w-4 h-4 inline'></ArrowDownIcon>
                        ))}
                    </th>
                    {/* <th className='py-3 px-6 text-center'>Description</th> */}
                    <th className='py-3 px-6 text-center'>Availability</th>
                    <th className='py-3 px-6 text-center'>Category</th>
                    <th className='py-3 px-6 text-center'>Seller</th>
                    <th className='py-3 px-6 text-center'>Edit</th>
                  </tr>
                </thead>
                <tbody className='text-red-500 text-sm font-bold'>
                  {medicines
                    .filter((product) => {
                      return product;
                    })
                    .sort((a, b) => {
                      if (sort._sort === 'price') {
                        if (sort._order === 'asc') {
                          return a.price - b.price;
                        } else if (sort._order == 'desc') {
                          return b.price - a.price;
                        }
                      } else if (sort._sort === 'id') {
                        if (sort._order === 'asc') {
                          return a.id - b.id;
                        } else if (sort._order == 'desc') {
                          return b.id - a.id;
                        }
                      }
                      return 0;
                    })
                    .map((medicine) => (
                      <tr className='border-b border-gray-200 hover:bg-gray-100'>
                        <td className='py-3 px-6 text-left whitespace-nowrap'>
                          <div className='flex items-center'>
                            <span className='font-medium'>{medicine.id}</span>
                          </div>
                        </td>
                        <td className='py-3 px-6 text-center'>
                          <div className=''>
                            <div>{medicine.name}</div>
                          </div>
                        </td>
                        <td className='py-3 px-6 text-center'>
                          <div className='flex items-center justify-center'>
                            <span>&#8377;</span>
                            {medicine.price}
                          </div>
                        </td>
                        {/* <td className='py-3 px-6 text-center'>
                        <div className=''>
                          <div>{medicine.description}</div>
                        </div>
                      </td> */}
                        <td className='py-3 px-6 text-center'>
                          <div className='flex items-center justify-center'>
                            {medicine.isAvailable ? 'Yes' : 'No'}
                          </div>
                        </td>
                        <td className='py-3 px-6 text-center'>
                          <div className='flex items-center justify-center'>
                            {medicine.category.medicineType}
                          </div>
                        </td>
                        <td className='py-3 px-6 text-center'>
                          <div className='flex items-center justify-center'>
                            {medicine.seller}
                          </div>
                        </td>

                        <td className='py-3 px-6 text-center'>
                          <div className='flex item-center justify-center'>
                            <div className='w-6 mr-2 transform text-black hover:text-black hover:scale-110'>
                              <Link
                                to={`/admin/product-form/edit/${medicine.id}`}
                              >
                                <PencilIcon className='w-8 h-8'></PencilIcon>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </>
  );
}
