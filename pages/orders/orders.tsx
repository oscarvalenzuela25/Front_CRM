import React from 'react';
import { NextPage } from 'next';
import BaseLayout from '@/components/Layouts/BaseLayout';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { IOrder } from '@/interfaces/order';
import Order from '@/components/Order';
import { GET_ORDERS_BY_SELLER } from '@/queries/order';

const Orders: NextPage = () => {
  const { data } = useQuery<{ getOrdersBySeller: IOrder[] }>(
    GET_ORDERS_BY_SELLER
  );

  return (
    <BaseLayout>
      <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>

      <Link
        href="/newOrder"
        className="bg-blue-800 p-2 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold"
      >
        Nuevo Pedido
      </Link>

      {!data?.getOrdersBySeller.length ? (
        <p className="mt-5 text-center text-2xl">No hay pedidos aún</p>
      ) : (
        data?.getOrdersBySeller.map(order => (
          <Order order={order} key={order._id} />
        ))
      )}
    </BaseLayout>
  );
};

export default Orders;
