import { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductByIdAsync,
  selectProductById,
} from '../../productList/productSlice';
import { useParams } from 'react-router-dom';
import { addToCartAsync } from '../../cart/cartSlice';
import { selectLoggedInUser } from '../../auth/authSlice';
import { Link } from 'react-router-dom';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminProductDetail() {
  // const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  // const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const product = useSelector(selectProductById);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const params = useParams();

  const handleCart = (e) => {
    const newItem = { ...product, quantity: 1, user: user.id };
    delete newItem['id'];
    dispatch(addToCartAsync(newItem));
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <div className='bg-white'>
      {product && (
        <div className='pt-6'>
          <nav aria-label='Breadcrumb'>
            <ol
              role='list'
              className='mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8'
            >
              {product.breadcrumbs &&
                product.breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className='flex items-center'>
                      <a
                        href={breadcrumb.href}
                        className='mr-2 text-sm font-medium text-gray-900'
                      >
                        {breadcrumb.name}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox='0 0 16 20'
                        fill='currentColor'
                        aria-hidden='true'
                        className='h-5 w-4 text-gray-300'
                      >
                        <path d='M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z' />
                      </svg>
                    </div>
                  </li>
                ))}
              <li className='text-sm'>
                <a
                  href={product.href}
                  aria-current='page'
                  className='font-medium text-gray-500 hover:text-gray-600'
                >
                  {product.title}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className='mx-auto mt-2 max-w-2xl sm:px-6  lg:max-w-2xl'>
            <div className='aspect-h-4 aspect-w-10 hidden overflow-hidden rounded-lg lg:block'>
              <img
                src={product.images[0]}
                alt={product.title}
                className='h-full w-full object-cover object-center'
              />
            </div>
            {/* <div className='hidden lg:grid lg:grid-cols-1 lg:gap-y-8'>
              <div className='aspect-h-2 aspect-w-3 overflow-hidden rounded-lg'>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className='h-full w-full object-cover object-center'
                />
              </div>
              <div className='aspect-h-2 aspect-w-3 overflow-hidden rounded-lg'>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className='h-full w-full object-cover object-center'
                />
              </div>
            </div>
            <div className='aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg'>
              <img
                src={product.images[0]}
                alt={product.title}
                className='h-full w-full object-cover object-center'
              />
            </div> */}
          </div>

          {/* Product info */}
          <div className='mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16'>
            <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
              <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
                {product.title}
              </h1>
            </div>

            {/* Options */}
            <div className='mt-4 lg:row-span-3 lg:mt-0'>
              <h2 className='sr-only'>Product information</h2>
              <p className='text-3xl tracking-tight text-gray-900'>
                <span>&#8377;</span>
                {product.price}
              </p>

              {/* Reviews */}
              <div className='mt-6'>
                <h3 className='sr-only'>Reviews</h3>
                <div className='flex items-center'>
                  <div className='flex items-center'>
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating
                            ? 'text-gray-900'
                            : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden='true'
                      />
                    ))}
                  </div>
                  <p className='sr-only'>{product.rating} out of 5 stars</p>
                </div>
              </div>

              <button
                onClick={handleCart}
                type='submit'
                className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Add to Cart
              </button>
            </div>

            <div className='py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6'>
              {/* Description and details */}
              {/* <div>
                <h3 className='sr-only'>Description</h3>

                <div className='space-y-6'>
                  <p className='text-base text-gray-900'>
                    {product.description}
                  </p>
                </div>
              </div> */}

              {/* <div className='mt-10'>
                

                <div className='mt-4'>
                  <ul role='list' className='list-disc space-y-2 pl-4 text-sm'>
                    {product.highlights &&
                      product.highlights.map((highlight) => (
                        <li key={highlight} className='text-gray-400'>
                          <span className='text-gray-600'>{highlight}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div> */}

              <div className='mt-10'>
                <h2 className='text-sm font-medium text-gray-900'>Details</h2>

                <div className='mt-4 space-y-6'>
                  <p className='text-sm text-gray-600'>{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
