"use client";
import SideNav from "../components/side-nav";
import { Grafica1 } from "../components/grafica1";
import { Grafica2 } from "../components/grafica2";
import { Grafica3 } from "../components/grafica3";

export default function About() {
  return (
    <div>
      <SideNav />
      <div className="flex">
        {/* Contenedor principal */}
        <div className="flex flex-1 justify-center items-start h-screen mt-20">
          <div className="flex flex-row items-center gap-5">
            {/* Gráficas */}
            <div className="w-72 h-72">
              <Grafica1 />
            </div>
            <div className="w-72 h-72">
              <Grafica2 />
            </div>
            <div className="w-72 h-72">
              <Grafica3 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
