import React, { useContext } from 'react';
import BaseLayout from '@/components/Layouts/BaseLayout';
import AssignClientToOrder from '@/components/order/AssignClientToOrder';
import OrderContext from '@/context/order/OrderContext';
import AssignProductToOrder from '@/components/order/AssignProductToOrder';
import OrderResume from '@/components/order/OrderResume';
import Total from '@/components/order/Total';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { GET_ORDERS_BY_SELLER, NEW_ORDER } from '@/queries/order';
import { NextPage } from 'next';

const NewOrder: NextPage = () => {
  const router = useRouter();
  const { client, products, total } = useContext(OrderContext);
  const [handleNewOrder, { loading, error }] = useMutation(NEW_ORDER, {
    refetchQueries: [{ query: GET_ORDERS_BY_SELLER }],
  });

  const orderValidator = () => {
    return !products.every(({ quantity }) => quantity > 0) ||
      total === 0 ||
      !client
      ? 'opacity-50 cursor-not-allowed'
      : '';
  };

  const newOrder = async () => {
    try {
      const orderData = {
        products: products.map(({ name, _id: id, price, quantity }) => ({
          id,
          name,
          price,
          quantity,
        })),
        total,
        client: client?._id,
      };
      await handleNewOrder({
        variables: {
          orderData,
        },
      });
      Swal.fire('Pedido creado!', '', 'success').then(() =>
        router.push('/orders')
      );
    } catch (e) {
      Swal.fire('Error al crear el pedido', error?.message, 'error');
    }
  };

  return (
    <BaseLayout>
      <h1 className="text-2xl text-gray-800 font-light">Crear nuevo pedido</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AssignClientToOrder />
          <AssignProductToOrder />
          <OrderResume />
          <Total />
          <button
            onClick={newOrder}
            className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${orderValidator()}`}
            disabled={loading || !!orderValidator()}
          >
            Registrar pedido
          </button>
        </div>
      </div>
    </BaseLayout>
  );
};

export default NewOrder;
