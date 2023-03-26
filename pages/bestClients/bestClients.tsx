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
import { GET_BEST_CLIENTS } from '@/queries/client';
import { IClient } from '@/interfaces/client';

const BestClientes: NextPage = () => {
  const { data } = useQuery<{
    getBestClients: { total: number; client: IClient[] }[];
  }>(GET_BEST_CLIENTS);

  return (
    <BaseLayout>
      <h1 className="text-2xl text-gray-800 font-light">Mejores Clientes</h1>

      <BarChart
        className="mt-10"
        width={600}
        height={500}
        data={data?.getBestClients || []}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="client.name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#3182CE" />
      </BarChart>
    </BaseLayout>
  );
};

export default BestClientes;
