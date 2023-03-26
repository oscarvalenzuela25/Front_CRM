import React from 'react';
import { NextPage } from 'next';
import AuthLayout from '@/components/Layouts/AuthLayout';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { NEW_USER_QUERY } from '@/queries/auth';

type Inputs = {
  name: string;
  lastname: string;
  email: string;
  password: string;
};

const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Campo requerido')
    .min(3, 'Minimo 3 caracteres')
    .max(20, 'No puede contener mas de 20 caracteres'),
  lastname: yup
    .string()
    .trim()
    .required('Campo requerido')
    .min(3, 'Minimo 3 caracteres')
    .max(20, 'Maximo 20 caracteres'),
  email: yup
    .string()
    .trim()
    .required('Campo requerido')
    .email('El email ingresado no es válido'),
  password: yup
    .string()
    .trim()
    .required('Campo requerido')
    .min(6, 'Minimo 6 caracteres')
    .max(20, 'Maximo 20 caracteres'),
});

const Register: NextPage = () => {
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(registerSchema) });

  const [registerNewUser, { loading, error, data }] =
    useMutation(NEW_USER_QUERY);

  const onSubmit: SubmitHandler<Inputs> = async userData => {
    try {
      await registerNewUser({
        variables: {
          userData,
        },
      });
      setTimeout(() => {
        replace('/login');
      }, 3000);
    } catch (error) {}
  };

  return (
    <AuthLayout>
      {data && (
        <div className="bg-green-100 p-4 w-full my-3 max-w-sm text-center mx-auto text-green-700">
          <p>{`Se creo correctamente el usuario ${data.newUser.name} ${data.newUser.lastname}`}</p>
        </div>
      )}

      {error?.message && (
        <div className="bg-red-100 p-4 w-full my-3 max-w-sm text-center mx-auto text-red-700">
          <p>{error?.message}</p>
        </div>
      )}
      <h1 className="text-center text-2xl text-white font-light">
        Crear nueva Cuenta
      </h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            noValidate
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Nombre
              </label>
              <input
                disabled={loading}
                placeholder="Nombre"
                id="name"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register('name')}
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
                disabled={loading}
                {...register('lastname')}
                placeholder="Apellido"
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
                htmlFor="email"
              >
                Email
              </label>
              <input
                disabled={loading}
                {...register('email')}
                placeholder="Email Usuario"
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
                htmlFor="password"
              >
                Password
              </label>
              <input
                disabled={loading}
                {...register('password')}
                placeholder="**********"
                id="password"
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.password?.message && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                  <p>{errors.password?.message}</p>
                </div>
              )}
            </div>

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900"
              value="Crear cuenta"
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
