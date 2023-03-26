import React, { useContext, FC } from 'react';
import OrderContext from '@/context/order/OrderContext';
import OrderProduct from './OrderProduct';

const OrderResume: FC = () => {
  const { products } = useContext(OrderContext);

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        3.- Ajusta las cantidades del producto
      </p>
      {products.length > 0 ? (
        <>
          {products.map(product => (
            <OrderProduct key={product._id} product={product} />
          ))}
        </>
      ) : (
        <p className="mt-5 text-sm">Aún no hay productos</p>
      )}
    </>
  );
};

export default OrderResume;
