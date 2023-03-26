import React from 'react';
import BaseLayout from '@/components/Layouts/BaseLayout';
import { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { ADD_CLIENT, GET_CLIENTS_BY_SELLER } from '@/queries/client';
import { IClient } from '@/interfaces/client';

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

const Newclient: NextPage = () => {
  const router = useRouter();
  const [addClient, { data, loading, error }] = useMutation<{
    newClient: IClient;
  }>(ADD_CLIENT, {
    refetchQueries: [{ query: GET_CLIENTS_BY_SELLER }],
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async clientData => {
    try {
      await addClient({
        variables: {
          clientData,
        },
      });
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {}
  };

  return (
    <BaseLayout>
      <h1 className="text-2xl text-gray-800 mb-10">Nuevo Cliente</h1>

      {data && (
        <div className="bg-green-100 p-4 w-full my-3 max-w-md text-center mx-auto text-green-700">
          <p>{`Se creo correctamente el usuario ${data.newClient.name} ${data.newClient.lastname}`}</p>
        </div>
      )}

      {error?.message && (
        <div className="bg-red-100 p-4 w-full my-3 max-w-md text-center mx-auto text-red-700">
          <p>{error?.message}</p>
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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
              disabled={loading}
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900"
              value="Agregar Cliente"
            />
          </form>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Newclient;
