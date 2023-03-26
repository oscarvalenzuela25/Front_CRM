import React from 'react';
import BaseLayout from '@/components/Layouts/BaseLayout';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useQuery } from '@apollo/client';
import { NextPage } from 'next';
import { GET_BEST_SELLER } from '@/queries/user';
import { IUser } from '@/interfaces/user';

const BestSellers: NextPage = () => {
  const { data } = useQuery<{
    getBestSellers: { total: number; seller: IUser[] }[];
  }>(GET_BEST_SELLER);

  return (
    <BaseLayout>
      <h1 className="text-2xl text-gray-800 font-light">Mejores vendedores</h1>

      <BarChart
        className="mt-10"
        width={600}
        height={500}
        data={data?.getBestSellers || []}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="seller.name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#3182CE" />
      </BarChart>
    </BaseLayout>
  );
};

export default BestSellers;
