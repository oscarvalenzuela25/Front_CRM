import React from 'react';
import BaseLayout from '@/components/Layouts/BaseLayout';
import { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import Product from '@/components/Product';
import { IProduct } from '@/interfaces/product';
import { GET_PRODUCTS } from '@/queries/product';

const Products: NextPage = () => {
  const { data } = useQuery<{ getProducts: IProduct[] }>(GET_PRODUCTS);

  return (
    <BaseLayout>
      <h1 className="text-2xl text-gray-800 font-light">Productos</h1>
      <Link
        href="/newProduct"
        className="bg-blue-800 p-2 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold"
      >
        Nuevo Producto
      </Link>

      <table className="table-auto shadow-md mt-8 w-full w-lg">
        <thead className="bg-gray-800">
          <tr className="text-white">
            <th className="w-1/5 py-2">Nombre</th>
            <th className="w-1/5 py-2">Precio</th>
            <th className="w-1/5 py-2">Stock</th>
            <th className="w-1/5 py-2">Eliminar</th>
            <th className="w-1/5 py-2">Editar</th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {data?.getProducts.map(product => (
            <Product product={product} key={product._id} />
          ))}
        </tbody>
      </table>
    </BaseLayout>
  );
};

export default Products;
