import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import {
  clearSelectedProduct,
  createProductAsync,
  fetchProductByIdAsync,
  selectAllCategories,
  selectProductById,
  updateProductAsync,
} from '../../productList/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../../common/Modal';
function ProductForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const categories = useSelector(selectAllCategories);
  const params = useParams();
  const selectedProduct = useSelector(selectProductById);
  const [openModal, setOpenModal] = useState(null);
  const [del, setDel] = useState(true);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue('name', selectedProduct.name);
      setValue('description', selectedProduct.description);
      setValue('categoryId', selectedProduct.categoryId);
      setValue('price', selectedProduct.price);
      setValue('seller', selectedProduct.seller);
      setValue('image', selectedProduct.image);
      setValue('isAvailable', selectedProduct.isAvailable);
      // if (!selectedProduct.deleted) {
      //   setDel(false);
      // } else {
      //   console.log(selectedProduct.deleted);
      // }
    }
  }, [selectedProduct, params.id, setValue]);

  const handleDelete = () => {
    const medicine = { ...selectedProduct };
    medicine.deleted = true;
    dispatch(updateProductAsync(medicine));
  };

  const handleCancel = (e) => {
    dispatch(clearSelectedProduct());
    reset();
  };

  return (
    <>
    <div className="flex justify-center items-center ">
      <div className="bg-white p-8 rounded-lg shadow-md">
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          const medicine = { ...data };
          medicine.price = +medicine.price;
          medicine.categoryId = +medicine.categoryId;
          medicine.isAvailable = JSON.parse(medicine.isAvailable.toLowerCase());
          medicine.deleted = false;
          if (params.id) {
            medicine.id = params.id;
            dispatch(updateProductAsync(medicine));
            reset();
          } else {
            console.log(medicine);
            dispatch(createProductAsync(medicine));
            reset();
          }
        })}
      >
        <div className='space-y-12 bg-white p-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='mt-10 text-xl text-base font-bold leading-7 text-black'>
              Add Medicine
            </h2>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              {selectedProduct && selectedProduct.deleted && (
                <h2 className='text-red-500'>This product is deleted</h2>
              )}
              <div className='sm:col-span-6'>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Medicine Name
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 '>
                    <input
                      type='text'
                      {...register('name', {
                        required: 'Medicine name is required',
                      })}
                      id='name'
                      autoComplete='name'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>

              <div className='col-span-full'>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Description
                </label>
                <div className='mt-2'>
                  <textarea
                    id='description'
                    {...register('description', {
                      required: 'Description is required',
                    })}
                    rows={3}
                    autoComplete='description'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                    defaultValue={''}
                  />
                </div>
              </div>
              <div className='col-span-full'>
                <label
                  htmlFor='categoryId'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Category
                </label>
                <div className='mt-2'>
                  <select
                    {...register('categoryId', {
                      required: 'Category is required',
                    })}
                  >
                    <option value=''>--choose category--</option>
                    {categories.map((category) => (
                      <option value={category.id}>
                        {category.medicineType}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='price'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Price
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 '>
                    <input
                      type='number'
                      {...register('price', {
                        required: 'Price is required',
                        min: 1,
                        max: 10000,
                      })}
                      id='price'
                      autoComplete='price'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='seller'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Seller
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 '>
                    <input
                      type='text'
                      {...register('seller', {
                        required: 'Seller is required',
                        min: 0,
                      })}
                      id='seller'
                      autoComplete='seller'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
              <div className='sm:col-span-6'>
                <label
                  htmlFor='thumbnail'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  ImageURL
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 '>
                    <input
                      type='text'
                      {...register('image', {
                        required: 'Image is required',
                      })}
                      id='image'
                      autoComplete='image'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='border-b border-gray-900/10 pb-12'>
            <div className='mt-10 space-y-10'>
              <fieldset>
                <legend className='text-sm font-semibold leading-6 text-gray-900'>
                  Available?
                </legend>
                <div className='mt-6 space-y-6'>
                  <div className='flex items-center gap-x-3'>
                    <input
                      id='yes'
                      {...register('isAvailable', {
                        required: 'Yes or No is required',
                      })}
                      //onChange={handlePayment}
                      value='true'
                      type='radio'
                      //checked={paymentmethod === 'cash'}
                      className='h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600'
                    />
                    <label
                      htmlFor='yes'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Yes
                    </label>
                  </div>
                  <div className='flex items-center gap-x-3'>
                    <input
                      id='no'
                      {...register('isAvailable', {
                        required: 'Yes or No is required',
                      })}
                      //onChange={handlePayment}
                      value='false'
                      type='radio'
                      //checked={paymentmethod === 'card'}
                      className='h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600'
                    />
                    <label
                      htmlFor='no'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      No
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <button
            type='button'
            className='text-sm font-semibold leading-6 text-gray-900'
            onClick={handleCancel}
          >
            Cancel
          </button>
          {selectedProduct && !selectedProduct.deleted && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenModal(true);
              }}
              type='submit'
              className='rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
            >
              Delete
            </button>
          )}
          <button
            type='submit'
            className='rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
          >
            Save
          </button>
        </div>
      </form>
      </div>
      </div>
      {selectedProduct && (
        <Modal
          title={`Delete ${selectedProduct.name}`}
          message='Are you sure you want to remove this medicine?'
          modOption='Delete'
          cancelOption='Cancel'
          modAction={handleDelete}
          cancelAction={() => setOpenModal(null)}
          showModal={openModal}
        />
      )}
    </>
  );
}

export default ProductForm;
