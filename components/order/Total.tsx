import React, { useContext, FC } from 'react';
import OrderContext from '@/context/order/OrderContext';

const Total: FC = () => {
  const { total } = useContext(OrderContext);
  return (
    <div className="flex items-center mt-5 justify-between bg-gray-300 p-3 border-solid border-2 border-gray-400">
      <h2 className="text-gray-800 text-lg">Total a pagar</h2>
      <p className="text-gray-800 mt-0">$ {total}</p>
    </div>
  );
};

export default Total;
