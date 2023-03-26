import React, { FC, PropsWithChildren } from 'react';
import Head from 'next/head';

interface Props extends PropsWithChildren {
  title?: string;
}

const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'CRM - Administración de Clientes'}</title>
        <meta name="description" content="Administración de clientes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
