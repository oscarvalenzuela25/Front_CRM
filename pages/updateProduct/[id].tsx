import BaseLayout from '@/components/Layouts/BaseLayout';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { IProduct } from '@/interfaces/product';
import Swal from 'sweetalert2';
import { NextPage } from 'next';
import { GET_PRODUCT, UPDATE_PRODUCT } from '@/queries/product';

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

const UpdateProduct: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormProduct>({
    resolver: yupResolver(schema),
    defaultValues: {
      price: 0,
      stock: 0,
    },
  });

  const {
    data: getProductData,
    loading: getProductLoading,
    error: getProductError,
  } = useQuery<{ getProduct: IProduct }>(GET_PRODUCT, {
    variables: {
      productId: router.query.id,
    },
  });

  const [
    handleUpdateProduct,
    { loading: updateProductLoading, error: updateProductError },
  ] = useMutation(UPDATE_PRODUCT);

  const onSubmit = async (formData: FormProduct) => {
    try {
      await handleUpdateProduct({
        variables: {
          productId: router.query.id,
          input: formData,
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Producto actualizado',
        showConfirmButton: true,
        confirmButtonText: 'Ir a productos',
      }).then(() => {
        router.push('/products');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar el producto',
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    if (getProductData) {
      setValue('name', getProductData.getProduct.name);
      setValue('price', getProductData.getProduct.price);
      setValue('stock', getProductData.getProduct.stock);
    }
  }, [getProductData, setValue]);

  return (
    <BaseLayout>
      <h1 className="text-2xl text-gray-800 mb-10">Editar producto</h1>

      {getProductError?.message && (
        <div className="bg-red-100 p-4 w-full my-3 max-w-md text-center mx-auto text-red-700">
          <p>{getProductError?.message}</p>
        </div>
      )}

      {updateProductError?.message && (
        <div className="bg-red-100 p-4 w-full my-3 max-w-md text-center mx-auto text-red-700">
          <p>{updateProductError?.message}</p>
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
                Nombre del producto
              </label>
              <input
                {...register('name')}
                disabled={getProductLoading || updateProductLoading}
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
                disabled={getProductLoading || updateProductLoading}
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
                Stock
              </label>
              <input
                {...register('stock')}
                disabled={getProductLoading || updateProductLoading}
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
              disabled={getProductLoading || updateProductLoading}
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900"
              value="Actualizar Producto"
            />
          </form>
        </div>
      </div>
    </BaseLayout>
  );
};

export default UpdateProduct;
