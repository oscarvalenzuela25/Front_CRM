import React, { FC, useState } from 'react';
import { IOrder, OrderStatutes } from '@/interfaces/order';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import {
  UPDATE_ORDER,
  DELETE_ORDER,
  GET_ORDERS_BY_SELLER,
} from '@/queries/order';

interface Props {
  order: IOrder;
}

const Order: FC<Props> = ({ order }) => {
  const { _id, total, client, status, products } = order;
  const [orderstatus, setOrderstatus] = useState<OrderStatutes>(status);
  const [
    handleUpdateOrder,
    { loading: updateOrderLoading, error: updateOrderError },
  ] = useMutation(UPDATE_ORDER);
  const [
    handleDeleteOrder,
    { loading: deleteOrderLoading, error: deleteOrderError },
  ] = useMutation(DELETE_ORDER, {
    refetchQueries: [{ query: GET_ORDERS_BY_SELLER }, 'getOrdersBySeller'],
  });

  const classByOrderStatus = {
    SUCCESS: 'border-green-500',
    PENDING: 'border-yellow-500',
    REJECTED: 'border-red-800',
  };

  const handleChangeOrderStatus = async (newOrderStatus: OrderStatutes) => {
    try {
      await handleUpdateOrder({
        variables: {
          orderId: _id,
          input: {
            status: newOrderStatus,
          },
        },
      });
      setOrderstatus(newOrderStatus);
      Swal.fire('Estado de la orden actualizada!', '', 'success');
    } catch (e) {
      Swal.fire(
        'Error al actualizar la orden',
        updateOrderError?.message,
        'error'
      );
    }
  };

  const onDeleteOrder = () => {
    Swal.fire({
      title: 'Estas seguro de eliminar el pedido?',
      text: 'El cambio es irreversible',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await handleDeleteOrder({
            variables: {
              orderId: _id,
            },
          });
          Swal.fire('Pedido eliminado!', '', 'success');
        } catch (error) {
          Swal.fire(
            'Error al eliminar el pedido',
            deleteOrderError?.message,
            'error'
          );
        }
      }
    });
  };

  return (
    <div
      className={`border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg ${classByOrderStatus[status]}`}
    >
      <div>
        <p className="font-bold text-gray-800">
          Cliente: {client.name} {client.lastname}
        </p>

        {client.email && (
          <p className="flex items-center my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            {client.email}
          </p>
        )}

        {client.phone && (
          <p className="flex items-center my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
              />
            </svg>
            {client.phone}
          </p>
        )}

        <h2 className="text-gray-800 font-bold mt-10">Estado Pedido:</h2>
        <select
          value={orderstatus}
          onChange={e =>
            handleChangeOrderStatus(e.target.value as OrderStatutes)
          }
          disabled={updateOrderLoading}
          className="mt-2 appearance-none bg-blue-600 border boder-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
        >
          <option value="SUCCESS">Completado</option>
          <option value="PENDING">Pendiente</option>
          <option value="REJECTED">Cancelado</option>
        </select>
      </div>

      <div>
        <h2 className="text-gray-800 font-bold mt-2">Resumen del pedido</h2>
        {products.map(prod => (
          <div key={prod._id} className="mt-4">
            <p className="text-sm text-gray-600">Producto: {prod.name}</p>
            <p className="text-sm text-gray-600">Cantidad: {prod.quantity}</p>
          </div>
        ))}

        <p className="text-gray-800 mt-3 font-bold">
          Total a pagar: <span className="font-light">$ {total}</span>
        </p>

        <button
          onClick={onDeleteOrder}
          disabled={deleteOrderLoading}
          className="uppercase text-xs font-bold flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight"
        >
          Eliminar pedido
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
      </div>
    </div>
  );
};

export default Order;
