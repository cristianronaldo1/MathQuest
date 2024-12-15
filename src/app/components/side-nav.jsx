'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SideNav() {
  const [openMenu, setOpenMenu] = useState('');

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? '' : menu);
  };

  return (
    <div className="w-[15%] h-screen bg-[#1d4ed8] shadow-md border-r border-gray-200 p-4 flex flex-col">
      <header className="mb-5 text-center">
        <Link href="/">
          <h1 className="text-3xl font-extrabold text-white">MathQuest</h1>
        </Link>
      </header>

      {/* Menú principal */}
      <nav className="flex flex-col gap-4 mt-8">
        {/* Actividades */}
        <div>
          <button
            className="w-full flex font-bold text-lg justify-between text-white hover:bg-[#9ca3af] items-center py-2 px-4 text-left rounded-md"
            onClick={() => toggleMenu('actividades')}
          >
            Actividades
            <span>{openMenu === 'actividades' ? '-' : '+'}</span>
          </button>
          {openMenu === 'actividades' && (
            <div className="text-white pl-4 flex flex-col gap-2 mt-2">
              <Link
                href="/actividades/reto1"
                className="text-sm hover:bg-[#94a3b8] rounded-md"
              >
                Reto 1
              </Link>
              <Link
                href="/actividades/reto2"
                className="text-sm hover:bg-[#94a3b8] rounded-md"
              >
                Reto 2
              </Link>
              <Link
                href="/actividades/reto3"
                className="text-sm hover:bg-[#94a3b8] rounded-md"
              >
                Reto 3
              </Link>
            </div>
          )}
        </div>

        {/* Entrenamiento */}
        <div>
          <button
            className="w-full flex justify-between text-white text-lg font-bold items-center py-2 px-4 text-left rounded-md hover:bg-[#9ca3af] transition"
            onClick={() => toggleMenu('entrenamiento')}
          >
            Entrenamiento
            <span>{openMenu === 'entrenamiento' ? '-' : '+'}</span>
          </button>
          {openMenu === 'entrenamiento' && (
            <div className="text-white pl-4 flex flex-col gap-2 mt-2">
              <Link
                href="/entrenamiento/sumas"
                className="text-sm hover:bg-[#94a3b8] rounded-md"
              >
                Sumas
              </Link>
              <Link
                href="/entrenamiento/restas"
                className="text-sm hover:bg-[#94a3b8] rounded-md"
              >
                Restas
              </Link>
              <Link
                href="/entrenamiento/multiplicacion"
                className="text-sm hover:bg-[#94a3b8] rounded-md"
              >
                Multiplicación
              </Link>
              <Link
                href="/entrenamiento/division"
                className="text-sm hover:bg-[#94a3b8] rounded-md"
              >
                División
              </Link>
            </div>
          )}
        </div>

        {/* Otros enlaces */}
        <Link
          href="/repaso"
          className="block py-2 px-4 rounded-md text-lg font-bold text-white hover:bg-[#9ca3af] transition"
        >
          Repasa tus logros
        </Link>

        <Link
          href="/dashboard"
          className="block py-2 px-4 rounded-md text-lg font-bold text-white hover:bg-[#9ca3af] transition"
        >
          Dashboard
        </Link>

        <Link
          href="/salir"
          className="block py-2 px-4 rounded-md text-lg font-bold text-white hover:bg-[#9ca3af] transition"
        >
          Salir
        </Link>
      </nav>
    </div>
  );
}
