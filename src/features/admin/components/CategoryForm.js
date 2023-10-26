import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import {
  clearSelectedCategory,
  createCategoryAsync,
  fetchCategoryByIdAsync,
  selectAllCategories,
  selectCategoryById,
  updateCategoryAsync,
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
  //const categories = useSelector(selectAllCategories);
  const selectedCategory = useSelector(selectCategoryById);
  const params = useParams();
  const [openModal, setOpenModal] = useState(null);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchCategoryByIdAsync(params.id));
    } else {
      dispatch(clearSelectedCategory());
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedCategory && params.id) {
      setValue('medicineType', selectedCategory.medicineType);
      // if (!selectedProduct.deleted) {
      //   setDel(false);
      // } else {
      //   console.log(selectedProduct.deleted);
      // }
    }
  }, [selectedCategory, params.id, setValue]);

  const handleDelete = () => {
    const category = { ...selectedCategory };
    category.deleted = true;
    dispatch(updateCategoryAsync(category));
    reset();
  };
  const handleCancel = (e) => {
    dispatch(clearSelectedCategory());
    reset();
  };
  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          const category = { ...data };
          category.deleted = false;
          if (params.id) {
            category.id = params.id;
            dispatch(updateCategoryAsync(category));
            reset();
          } else {
            dispatch(createCategoryAsync(category));
            reset();
          }
        })}
      >
        <div className='space-y-12 bg-white p-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='mt-10 text-xl text-base font-bold leading-7 text-black'>
              Edit Category
            </h2>

            <div className='mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              {selectedCategory && selectedCategory.deleted ? (
                <h2 className='text-red-500'>This category is deleted</h2>
              ) : null}
              <div className='sm:col-span-6'>
                <label
                  htmlFor='medicineType'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Category Name:
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 '>
                    <input
                      type='text'
                      {...register('medicineType', {
                        required: 'Category name is required',
                      })}
                      id='medicineType'
                      autoComplete='medicineType'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
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
          {selectedCategory && !selectedCategory.deleted && (
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
      {selectedCategory && (
        <Modal
          title={`Delete ${selectedCategory.medicineType}`}
          message='Are you sure you want to remove this category?'
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
