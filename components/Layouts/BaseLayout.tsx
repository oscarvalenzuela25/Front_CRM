import React, { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import Sidebar from '../Sidebar';
import Header from '../Header';

interface Props extends PropsWithChildren {
  title?: string;
}

const BaseLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'CRM - Administración de Clientes'}</title>
        <meta name="description" content="Administración de clientes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-gray-200 min-h-screen">
        <div className="sm:flex min-h-screen">
          <Sidebar />

          <main className="sm:min-h-screen sm:w-2/3 xl:w-4/5 p-5">
            <Header />
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default BaseLayout;
