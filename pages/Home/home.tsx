import React from 'react';
import BaseLayout from '@/components/Layouts/BaseLayout';
import { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import { IClient } from '@/interfaces/client';
import Link from 'next/link';
import Client from '@/components/Client';
import { GET_CLIENTS_BY_SELLER } from '@/queries/client';

const Home: NextPage = () => {
  const { data } = useQuery<{ getClientsBySeller: IClient[] }>(
    GET_CLIENTS_BY_SELLER
  );

  return (
    <BaseLayout>
      <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>

      <Link
        href="/newClient"
        className="bg-blue-800 p-2 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold w-full sm:w-auto text-center"
      >
        Nuevo Cliente
      </Link>

      <div className="overflow-x-scroll">
        <table className="table-auto shadow-md mt-8 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">Eliminar</th>
              <th className="w-1/5 py-2">Editar</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {data?.getClientsBySeller.map(client => (
              <Client client={client} key={client._id} />
            ))}
          </tbody>
        </table>
      </div>
    </BaseLayout>
  );
};

export default Home;
