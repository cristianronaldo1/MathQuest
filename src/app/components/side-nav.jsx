'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TopNav() {
  const [openMenu, setOpenMenu] = useState('');
  const [profileMenu, setProfileMenu] = useState(false);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? '' : menu);
  };

  const toggleProfileMenu = () => {
    setProfileMenu(!profileMenu);
  };

  return (
    <div className="w-full bg-[#0a5cb8] shadow-md border-b border-gray-200 p-4 flex justify-between items-center">
      <header className="text-center">
        <Link href="/">
          <h1 className="text-3xl font-extrabold text-white">MathQuest</h1>
        </Link>
      </header>

      <nav className="flex items-center gap-8">
        {/* Actividades */}
        <div className="relative">
          <button
            className="font-bold text-lg text-white hover:bg-[#9ca3af] py-2 px-4 rounded-md"
            onClick={() => toggleMenu('actividades')}
          >
            Actividades
            <span className="ml-2">{openMenu === 'actividades' ? '▲' : '▼'}</span>
          </button>
          {openMenu === 'actividades' && (
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white text-black shadow-md rounded-md z-10">
              <Link href="/actividades/reto1" className="block px-4 py-2 hover:bg-[#94a3b8] rounded-md">
                Reto 1
              </Link>
              <Link href="/actividades/reto2" className="block px-4 py-2 hover:bg-[#94a3b8] rounded-md">
                Reto 2
              </Link>
              <Link href="/actividades/reto3" className="block px-4 py-2 hover:bg-[#94a3b8] rounded-md">
                Reto 3
              </Link>
            </div>
          )}
        </div>

        {/* Otros enlaces */}
        <Link href="/repasar" className="font-bold text-lg text-white hover:bg-[#9ca3af] py-2 px-4 rounded-md text-center">
          Repasa tus logros
        </Link>

        <Link href="/dashboard" className="font-bold text-lg text-white hover:bg-[#9ca3af] py-2 px-4 rounded-md text-center">
          Dashboard
        </Link>

        <Link href="/about" className="font-bold text-lg text-white hover:bg-[#9ca3af] py-2 px-4 rounded-md text-center">
          About
        </Link>
      </nav>

      {/* Perfil */}
      <div className="relative flex items-center gap-2 cursor-pointer" onClick={toggleProfileMenu}>
        <img
          src="/fotodemi.jpeg" // Cambia esto por la ruta de tu imagen
          alt="Perfil"
          className="w-10 h-10 rounded-full object-cover border border-white"
        />
        <span className="text-white">▼</span>

        {profileMenu && (
          <div className="absolute right-0 mt-6 bg-white text-black shadow-md rounded-md w-64 p-4 z-10">
            <p className="text-sm text-gray-500 mb-2">Actualmente en</p>
            <div className="flex items-center gap-4">
              <img
                src="/fotodemi.jpeg" // Cambia esto por la ruta de tu imagen
                alt="Perfil"
                className="w-12 h-12 rounded-full object-cover border border-gray-300"
              />
              <div>
                <p className="font-bold text-lg">Cristian</p>
                <p className="text-sm text-gray-500">Estudiante</p>
                <p className="text-sm text-gray-500">calborparra@gmail.com</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}