import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import BaseLayout from '@/components/Layouts/BaseLayout';
import { useForm } from 'react-hook-form';
import { NextPage } from 'next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useQuery, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { GET_CLIENT_BY_ID, UPDATE_CLIENT } from '@/queries/client';

type FormData = {
  name: string;
  lastname: string;
  business: string;
  email: string;
  phone: string;
};

const schema = yup.object({
  name: yup.string().trim().required('Campo requerido'),
  lastname: yup.string().trim().required('Campo requerido'),
  business: yup.string().trim().required('Campo requerido'),
  email: yup.string().email('Email invalido').required('Campo requerido'),
  phone: yup.string().trim().required('Campo requerido'),
});

const UpdateClient: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const {
    data: getClientData,
    loading: getClientIsLoading,
    error: getClientError,
  } = useQuery(GET_CLIENT_BY_ID, {
    variables: {
      clientId: query.id,
    },
  });

  const [
    handleUpdateClient,
    { loading: updateClientIsLoading, error: updateClientError },
  ] = useMutation(UPDATE_CLIENT);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await handleUpdateClient({
        variables: {
          clientId: query.id,
          input: data,
        },
      });

      Swal.fire({
        title: 'Cliente Actualizado!',
        timer: 2000,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ok',
        timerProgressBar: true,
      }).then(result => {
        if (result.dismiss === Swal.DismissReason.timer) {
          router.push('/');
        }
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (getClientData) {
      setValue('name', getClientData.getClient.name);
      setValue('lastname', getClientData.getClient.lastname);
      setValue('business', getClientData.getClient.business);
      setValue('email', getClientData.getClient.email);
      setValue('phone', getClientData.getClient.phone);
    }
  }, [getClientData, setValue]);

  return (
    <BaseLayout>
      <h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>

      {getClientError?.message && (
        <div className="bg-red-100 p-4 w-full my-3 max-w-md text-center mx-auto text-red-700">
          <p>{getClientError?.message}</p>
        </div>
      )}

      {updateClientError?.message && (
        <div className="bg-red-100 p-4 w-full my-3 max-w-md text-center mx-auto text-red-700">
          <p>{updateClientError?.message}</p>
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
                Nombre Cliente
              </label>
              <input
                {...register('name')}
                disabled={getClientIsLoading || updateClientIsLoading}
                id="name"
                type="text"
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
                htmlFor="lastname"
              >
                Apellido
              </label>
              <input
                {...register('lastname')}
                disabled={getClientIsLoading || updateClientIsLoading}
                id="lastname"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.lastname?.message && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                  <p>{errors.lastname?.message}</p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="business"
              >
                Nombre de la empresa
              </label>
              <input
                {...register('business')}
                disabled={getClientIsLoading || updateClientIsLoading}
                id="business"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.business?.message && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                  <p>{errors.business?.message}</p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                {...register('email')}
                disabled={getClientIsLoading || updateClientIsLoading}
                id="email"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.email?.message && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                  <p>{errors.email?.message}</p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Telefono
              </label>
              <input
                {...register('phone')}
                disabled={getClientIsLoading || updateClientIsLoading}
                id="phone"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.phone?.message && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                  <p>{errors.phone?.message}</p>
                </div>
              )}
            </div>

            <input
              disabled={
                getClientIsLoading ||
                !!getClientError?.message ||
                updateClientIsLoading
              }
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900"
              value="Editar cliente"
            />
          </form>
        </div>
      </div>
    </BaseLayout>
  );
};

export default UpdateClient;
