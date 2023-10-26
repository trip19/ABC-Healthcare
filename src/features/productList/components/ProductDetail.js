import { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductByIdAsync,
  selectProductById,
  selectProductListStatus,
} from '../productSlice';
import { useParams } from 'react-router-dom';
import { addToCartAsync, selectItems } from '../../cart/cartSlice';
import { selectLoggedInUser } from '../../auth/authSlice';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Blocks } from 'react-loader-spinner';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetail() {
  const product = useSelector(selectProductById);
  const user = useSelector(selectLoggedInUser);
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();
  const status = useSelector(selectProductListStatus);

  const handleCart = (e) => {
    e.preventDefault();
    if (user) {
      if (items.findIndex((item) => item.medId === product.id) < 0) {
        const newItem = {
          medId: product.id,
          quantity: 1,
          userId: user.id,
        };
        dispatch(addToCartAsync(newItem));
        alert.success('Item added to cart');
      } else {
        alert.error('Already added to cart!');
      }
    } else {
      alert.error('Login to add to cart');
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="bg-white">
      {status === 'loading' ? (
        <Blocks
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      ) : null}
      {product && (
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              {product.breadcrumbs &&
                product.breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <a
                        href={breadcrumb.href}
                        className="mr-2 text-sm font-medium text-gray-900"
                      >
                        {breadcrumb.name}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                ))}
              <li className="text-sm">
                <a
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.name}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery and Product info side by side */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24 lg:pt-16 flex flex-wrap">
            <div className="lg:w-1/2">
              <div className="aspect-h-5 aspect-w-10 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-center"
                />
              </div>
            </div>
            <div className="py-10 bg-eeff5db lg:w-1/2 lg:pl-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
              <h2 className="sr-only">Medicine information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                <span>&#8377;</span>
                {product.price}
              </p>
              <div className="lg:border-r lg:border-gray-200 lg:pr-8 mt-10">
            <div className="">
              <h2 className="text-l font-medium text-black">Description: {product.description}</h2>
            </div>
            <div className="mt-5">
              <h2 className="text-l font-medium text-black">Seller: {product.seller}</h2>
            </div>
          </div>
              <button
                onClick={handleCart}
                type="submit"
                className="mt-10 block text-center text-white bg-red-500 hover:bg-red-700  px-4 py-2 rounded fw-3"
              >
                Add to Cart
              </button>
            </div>
          </div>

        
        </div>
      )}
    </div>
  );
}
