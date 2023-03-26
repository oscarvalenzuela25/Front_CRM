import React, { FC, useContext, useEffect, useState } from 'react';
import OrderContext from '@/context/order/OrderContext';
import { IProduct } from '@/interfaces/product';

interface Props {
  product: IProduct;
}

const OrderProduct: FC<Props> = ({ product }) => {
  const { addProductToOrder, updateTotal } = useContext(OrderContext);
  const [quantity, setQuantity] = useState(0);

  const updateQuantity = () => {
    const newProduct = { ...product, quantity };
    addProductToOrder(newProduct);
  };

  useEffect(() => {
    updateQuantity();
    updateTotal();
  }, [quantity]);

  return (
    <div
      className="md:flex md:justify-between md:items-center mt-5"
      key={product._id}
    >
      <div className="md:w-2/4 mb-2 md:mb-0 ">
        <p className="text-sm font-bold">{product.name}</p>
        <p className="text-sm">${product.price}</p>
      </div>
      <input
        type="number"
        placeholder="Cantidad"
        className="shadow apperance_none border rounded w-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
      />
    </div>
  );
};

export default OrderProduct;
