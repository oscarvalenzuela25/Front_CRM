import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { IUser } from '@/interfaces/user';
import { useRouter } from 'next/router';
import { GET_USER } from '@/queries/user';
import { GetServerSideProps } from 'next';

const Header: FC = () => {
  const { replace } = useRouter();
  const { data, loading, error } = useQuery<{ getUser: IUser }>(GET_USER);

  if (loading) {
    return <></>;
  }

  if (!data && error) {
    replace('/login');
    return <></>;
  }

  const logout = () => {
    localStorage.removeItem('token');
    replace('/login');
  };

  return (
    <div className="sm:flex sm:justify-between mb-5">
      <p className="mr-2 mb-5 lg:mb-0">
        Hola {data?.getUser?.name} {data?.getUser?.lastname}
      </p>
      <button
        type="button"
        onClick={logout}
        className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-sx rounded p-2 text-white shadow-md hover:bg-gray-800 text-sm"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Header;
