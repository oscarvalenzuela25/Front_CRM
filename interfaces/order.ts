import { IProductQuantity } from './product';
import { IClient } from './client';

export type OrderStatutes = 'PENDING' | 'SUCCESS' | 'REJECTED';

export interface IOrder {
  _id: number;
  products: IProductQuantity[];
  total: number;
  client: IClient;
  seller: number;
  status: OrderStatutes;
  createdAt: string;
}
