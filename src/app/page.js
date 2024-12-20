"use client";
import SideNav from "./components/side-nav";


export default function Home() {
  return (
    <div>
      <SideNav />
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Hola, bienvenido a MathQuest, Cristian!</h1>
        <p className="text-lg text-gray-600 mb-8">Estamos emocionados de que estés aquí. Prepárate para embarcarte en una aventura matemática increíble. 🎉</p>
        <img src="/mathquest4.png" width={300} height={300} className="mx-auto" alt="MathQuest Logo" />
      </div>
    </div>
  );
}
