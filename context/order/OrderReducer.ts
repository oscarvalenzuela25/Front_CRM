import { IClient } from '@/interfaces/client';
import { IProduct, IProductQuantity } from '@/interfaces/product';
import {
  CLIENT_SELECTED,
  PRODUCTS_SELECTED,
  ADD_PRODUCT_QUANTITY,
  UPDATE_TOTAL_ORDER,
} from '../../types';

type Actions =
  | {
      type: 'CLIENT_SELECTED';
      payload: { client: IClient };
    }
  | {
      type: 'PRODUCTS_SELECTED';
      payload: { products: IProduct[] };
    }
  | {
      type: 'ADD_PRODUCT_QUANTITY';
      payload: { product: IProductQuantity };
    }
  | {
      type: 'UPDATE_TOTAL_ORDER';
      payload: undefined;
    };

const OrderReducer = (state: any, { type, payload }: Actions) => {
  switch (type) {
    case CLIENT_SELECTED:
      return {
        ...state,
        client: payload.client,
      };
    case PRODUCTS_SELECTED:
      return {
        ...state,
        products: payload.products.map(product => {
          const oldProduct = state.products.find(
            (x: IProductQuantity) => x._id === product._id
          );
          return oldProduct ? oldProduct : { ...product, quantity: 0 };
        }),
      };
    case ADD_PRODUCT_QUANTITY:
      return {
        ...state,
        products: state.products.map((product: IProductQuantity) => {
          return product._id === payload.product._id
            ? payload.product
            : product;
        }),
      };
    case UPDATE_TOTAL_ORDER:
      return {
        ...state,
        total: state.products.reduce(
          (accumulator: number, { price, quantity }: IProductQuantity) =>
            accumulator + Number(price * quantity),
          0
        ),
      };
    default:
      return { ...state };
  }
};

export default OrderReducer;
