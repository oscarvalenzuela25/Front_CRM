import React from 'react';
import BaseLayout from '@/components/Layouts/BaseLayout';
import { NextPage } from 'next';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { ADD_NEW_PRODUCT, GET_PRODUCTS } from '@/queries/product';

const schema = yup.object({
  name: yup.string().trim().required('Campo requerido'),
  stock: yup.number().min(0, 'Valor minimo es 0').required('Campo requerido'),
  price: yup.number().min(0, 'Valor minimo es 0').required('Campo requerido'),
});

type FormProduct = {
  name: string;
  stock: number;
  price: number;
};

const NewProduct: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProduct>({
    resolver: yupResolver(schema),
    defaultValues: {
      price: 0,
      stock: 0,
    },
  });

  const [
    handleNewProduct,
    { loading: newProductLoading, error: newProductError },
  ] = useMutation(ADD_NEW_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  const onSubmit = async (formData: FormProduct) => {
    try {
      await handleNewProduct({
        variables: {
          formData,
        },
      });
      Swal.fire({
        title: 'Producto agregado exitosamente!',
        icon: 'success',
        confirmButtonText: 'Ir a mis productos',
      }).then(() => {
        router.push('/products');
      });
    } catch (error) {
      Swal.fire({
        title: 'Error al agregar el producto',
        icon: 'error',
      });
    }
  };

  return (
    <BaseLayout>
      <h1 className="text-2xl text-gray-800 mb-10">Nuevo Producto</h1>

      {newProductError?.message && (
        <div className="bg-red-100 p-4 w-full my-3 max-w-md text-center mx-auto text-red-700">
          <p>{newProductError?.message}</p>
        </div>
      )}

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Nombre
              </label>
              <input
                {...register('name')}
                disabled={newProductLoading}
                id="name"
                type="text"
                placeholder="nuevo producto..."
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.name?.message && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                  <p>{errors.name?.message}</p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Precio
              </label>
              <input
                {...register('price')}
                disabled={newProductLoading}
                id="price"
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.price?.message && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                  <p>{errors.price?.message}</p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="stock"
              >
                Stock disponible
              </label>
              <input
                {...register('stock')}
                disabled={newProductLoading}
                id="stock"
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.stock?.message && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                  <p>{errors.stock?.message}</p>
                </div>
              )}
            </div>

            <input
              disabled={newProductLoading}
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900"
              value="Agregar Producto"
            />
          </form>
        </div>
      </div>
    </BaseLayout>
  );
};

export default NewProduct;
