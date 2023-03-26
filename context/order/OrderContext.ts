import { IClient } from '@/interfaces/client';
import { IProduct, IProductQuantity } from '@/interfaces/product';
import { createContext } from 'react';

interface ContextState {
  client: IClient | null;
  products: IProductQuantity[];
  total: number;
  setClientSelected: (client: IClient) => void;
  setProductsSelected: (products: IProduct[]) => void;
  addProductToOrder: (product: IProductQuantity) => void;
  updateTotal: () => void;
}

const OrderContext = createContext({} as ContextState);

export default OrderContext;
