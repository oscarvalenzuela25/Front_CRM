import React from 'react';
import { NextPage } from 'next';
import AuthLayout from '@/components/Layouts/AuthLayout';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { LOGIN_QUERY } from '@/queries/auth';

type Inputs = {
  email: string;
  password: string;
};

const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Ingrese un mail válido')
    .required('Campo requerido'),
  password: yup.string().trim().required('Campo requerido'),
});

const Login: NextPage = () => {
  const { replace } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(loginSchema) });

  const [authUser, { loading, error }] = useMutation<{
    authUser: { token: string };
  }>(LOGIN_QUERY);

  const onSubmit: SubmitHandler<Inputs> = async loginData => {
    try {
      const { data } = await authUser({
        variables: {
          loginData,
        },
      });
      localStorage.setItem('token', data?.authUser?.token || '');
      replace('/');
    } catch (error) {}
  };

  return (
    <AuthLayout>
      {error?.message && (
        <div className="bg-red-100 p-4 w-full my-3 max-w-sm text-center mx-auto text-red-700">
          <p>{error?.message}</p>
        </div>
      )}
      <h1 className="text-center text-2xl text-white font-light">Login</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
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
                {...register('password')}
                disabled={loading}
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
              disabled={loading}
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900"
              value="Iniciar Sesión"
            />
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
