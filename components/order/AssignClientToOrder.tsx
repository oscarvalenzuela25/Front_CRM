import React, { useContext, FC } from 'react';
import Select from 'react-select';
import { useQuery } from '@apollo/client';
import { IClient } from '@/interfaces/client';
import OrderContext from '@/context/order/OrderContext';
import { GET_CLIENTS_BY_SELLER } from '@/queries/client';

const AssignClientToOrder: FC = () => {
  const { setClientSelected } = useContext(OrderContext);
  const { data, loading } = useQuery<{ getClientsBySeller: IClient[] }>(
    GET_CLIENTS_BY_SELLER
  );

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        1.- Asigna un cliente al pedido
      </p>
      <Select
        className="mt-3"
        options={data?.getClientsBySeller || []}
        isLoading={loading}
        onChange={clientSelected =>
          setClientSelected(clientSelected as IClient)
        }
        getOptionValue={(options: IClient) => options._id}
        getOptionLabel={(options: IClient) =>
          `${options.name} ${options.lastname}`
        }
        placeholder="Busque o seleccione el cliente"
        noOptionsMessage={() => 'No existe ese cliente'}
      />
    </>
  );
};

export default AssignClientToOrder;
