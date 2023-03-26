import React, { FC } from 'react';
import { IClient } from '@/interfaces/client';
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { DELETE_CLIENTE, GET_CLIENTS_BY_SELLER } from '@/queries/client';

interface Props {
  client: IClient;
}

const Client: FC<Props> = ({ client }) => {
  const router = useRouter();
  const [deleteClient, { loading: loadingDelete, error: errorDelete }] =
    useMutation(DELETE_CLIENTE, {
      update(cache) {
        const { getClientsBySeller } = cache.readQuery<any>({
          query: GET_CLIENTS_BY_SELLER,
        });

        cache.writeQuery({
          query: GET_CLIENTS_BY_SELLER,
          data: {
            getClientsBySeller: getClientsBySeller.filter(
              (cacheClient: IClient) => cacheClient._id !== client._id
            ),
          },
        });
      },
    });

  const confirmDeleteClient = () => {
    Swal.fire({
      title: '¿Deseas eliminar a este cliente?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonColor: '#d33',
      cancelButtonText: `Cancelar`,
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await deleteClient({
            variables: {
              clientId: client._id,
            },
          });
          Swal.fire('Eliminado!', '', 'success');
        } catch (e) {
          Swal.fire(errorDelete?.message || '', '', 'error');
        }
      }
    });
  };

  const updateClient = () => {
    router.push({
      pathname: '/updateClient/[id]',
      query: { id: client._id },
    });
  };

  return (
    <tr key={client._id}>
      <td className="border px-4 py-2">
        {client.name} {client.lastname}
      </td>
      <td className="border px-4 py-2">{client.business}</td>
      <td className="border px-4 py-2">{client.email}</td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs font-bold"
          onClick={() => confirmDeleteClient()}
          disabled={loadingDelete}
        >
          Eliminar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </td>

      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs font-bold"
          onClick={() => updateClient()}
          disabled={loadingDelete}
        >
          Editar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Client;
