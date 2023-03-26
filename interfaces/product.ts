export interface IProduct {
  _id: string;
  name: string;
  stock: number;
  price: number;
  createdAt: string;
}

export interface IProductQuantity extends IProduct {
  quantity: number;
}
