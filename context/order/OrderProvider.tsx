import { IClient } from '@/interfaces/client';
import { IProduct, IProductQuantity } from '@/interfaces/product';
import React, { useReducer, PropsWithChildren } from 'react';
import {
  CLIENT_SELECTED,
  PRODUCTS_SELECTED,
  ADD_PRODUCT_QUANTITY,
  UPDATE_TOTAL_ORDER,
} from '../../types';
import OrderContext from './OrderContext';
import OrderReducer from './OrderReducer';

export interface IState {
  client: IClient | null;
  products: IProductQuantity[];
  total: number;
}

const INITIAL_STATE: IState = {
  client: null,
  products: [],
  total: 0,
};

interface Props extends PropsWithChildren {}

const OrderProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(OrderReducer, INITIAL_STATE);

  const setClientSelected = (client: IClient) => {
    dispatch({
      type: CLIENT_SELECTED,
      payload: { client },
    });
  };

  const setProductsSelected = (products: IProduct[]) => {
    dispatch({
      type: PRODUCTS_SELECTED,
      payload: { products },
    });
  };

  const addProductToOrder = (product: IProductQuantity) => {
    dispatch({
      type: ADD_PRODUCT_QUANTITY,
      payload: { product },
    });
  };

  const updateTotal = () => {
    dispatch({ type: UPDATE_TOTAL_ORDER, payload: undefined });
  };

  return (
    <OrderContext.Provider
      value={{
        ...state,
        setClientSelected,
        setProductsSelected,
        addProductToOrder,
        updateTotal,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
