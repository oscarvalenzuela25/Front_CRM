import React, { useContext, FC } from 'react';
import Select from 'react-select';
import { useQuery } from '@apollo/client';
import OrderContext from '@/context/order/OrderContext';
import { IProduct } from '@/interfaces/product';
import { GET_PRODUCTS } from '@/queries/product';

const AssignProductToOrder: FC = () => {
  const { setProductsSelected, updateTotal } = useContext(OrderContext);
  const { data, loading } = useQuery<{ getProducts: IProduct[] }>(GET_PRODUCTS);

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        2.- Asigna productos al pedido
      </p>
      <Select
        className="mt-3"
        isMulti
        options={data?.getProducts || []}
        isLoading={loading}
        onChange={productsSelected => {
          setProductsSelected(productsSelected as IProduct[]);
          updateTotal();
        }}
        getOptionValue={(options: IProduct) => options._id}
        getOptionLabel={(options: IProduct) =>
          `${options.name} - ${options.stock} Disponibles`
        }
        placeholder="Busque o seleccione los productos"
        noOptionsMessage={() => 'No existe ese producto'}
      />
    </>
  );
};

export default AssignProductToOrder;
