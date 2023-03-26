import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar: FC = () => {
  const { pathname } = useRouter();

  return (
    <aside className="bg-gray-800 sm:w-1/3 sm:min-h-screen xl:w-1/5 p-5">
      <div>
        <p className="text-white text-2xl font-black">CRM Clientes</p>
      </div>
      <nav className="mt-5 list-none">
        <li
          className={
            pathname === '/' || pathname === '/newClient'
              ? 'bg-blue-800 p-2 mb-2'
              : 'p-2 bm-2'
          }
        >
          <Link href="/" passHref legacyBehavior>
            <a className="text-white">Clientes</a>
          </Link>
        </li>
        <li
          className={
            pathname === '/orders' || pathname === '/newOrder'
              ? 'bg-blue-800 p-2 mb-2'
              : 'p-2 bm-2'
          }
        >
          <Link href="/orders" passHref legacyBehavior>
            <a className="text-white">Pedidos</a>
          </Link>
        </li>
        <li
          className={
            pathname === '/products' || pathname === '/newProduct'
              ? 'bg-blue-800 p-2 mb-2'
              : 'p-2 bm-2'
          }
        >
          <Link href="/products" passHref legacyBehavior>
            <a className="text-white">Productos</a>
          </Link>
        </li>
      </nav>

      <div className="mt-10">
        <p className="text-white text-2xl font-black">Otras opciones</p>
      </div>

      <nav className="mt-3 list-none">
        <li
          className={
            pathname === '/bestSellers' ? 'bg-blue-800 p-2 mb-2' : 'p-2 bm-2'
          }
        >
          <Link href="/bestSellers" passHref legacyBehavior>
            <a className="text-white">Mejores vendedores</a>
          </Link>
        </li>

        <li
          className={
            pathname === '/bestClients' ? 'bg-blue-800 p-2 mb-2' : 'p-2 bm-2'
          }
        >
          <Link href="/bestClients" passHref legacyBehavior>
            <a className="text-white">Mejores clientes</a>
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
