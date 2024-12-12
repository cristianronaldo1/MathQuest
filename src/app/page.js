"use client";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
//Importa al esquema desde el archivo
import { schema } from "./Schema";

// Configuración del modelo de Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    // aqui utiliza el esquema importado.
    responseSchema: schema,
  },
});

export default function Home() {
  const fixedPrompt =
    "Teniendo en cuenta el siguiente planteamiento, genera tres resultados dos incorrectos y uno correcto: Dos de tus tíos que viven en Ecuador, en la ciudad de Ibarra, los invitan a tu hermano ya ti a pasar unos días en su casa en estas vacaciones. Tu cumpleaños Será pronto, por lo que tu tía ha decidido celebrarlo asistiendo a un partido de fútbol en el estadio Olímpico Atahualpa (en la ciudad de Quito). Tus tíos pagarán las cuatro boletas del partido, la noche en el hotel y la comida que consumirán durante. el Partido. Además, quieres regalarte un recuerdo del equipo para tu cumpleaños. Para ello, tus tíos han destinado un presupuesto total de $575 (la moneda oficial en Ecuador es el dólar). las cuatro boletas para ir al partido de fútbol, el costo de la comida de los cuatro durante el partido, y los pasajes de transporte de los cuatro del hotel al estadio y de vuelta al hotel. recuerdo del equipo. Tus tíos también quieren que determine a qué hora tendrán que salir del hotel para ir al estadio ya qué hora estarán de vuelta. Información con respecto a los precios: Ten presente que todos deben estar ubicados en la misma sección. Sección de admisión general: $22,50 Sección 4: $29 Sección 3: $46,75 Sección 2: $61,25 Sección 1: $82 Camiseta oficial del equipo: $45 Cachucha estampada: $22 Camiseta sin estampado: $15 Saco: $52 Bufanda: $26 Comida (un pedazo de pizza, un helado y una limonada): $14,75 El costo de un cuarto de hotel para cuatro personas: $239,95 El costo de los trayectos (pasajes para tomar el transporte público): Un trayecto por $3,25, 2 trayectos por $6 y 10 por $26,50. ";

  const [correctAnswer, setCorrectAnswer] = useState("");
  const [wrongAnswer1, setWrongAnswer1] = useState("");
  const [wrongAnswer2, setWrongAnswer2] = useState("");

  const geminiCall = async () => {
    try {
      const result = await model.generateContent(fixedPrompt);
      const responseJSON = JSON.parse(result.response.text());


      if (Array.isArray(responseJSON)) {
        // Encuentra las respuestas según el campo correcta
        const correct = responseJSON.find((item) => item.correcta);
        const wrongs = responseJSON.filter((item) => !item.correcta);

      

        //Asignar valores de manera segura
        setCorrectAnswer(correct?.respuesta || "No disponible");
        setWrongAnswer1(wrongs[0]?.respuesta || "No disponible");
        setWrongAnswer2(wrongs[1]?.respuesta || "No disponible");
      } else {
        console.error("La respuesta no está en el formato esperado.");
      }
    } catch (error) {
      console.error("Error procesando la respuesta:", error);
    }
  };

  return (
    <section className="flex gap-4">
      <div className=" w-1/3 bg-blue-300 border-2 border-blue-950 text-2xl text-black " >
  
        <lu>
          <li className="menus">Actividades</li>
          <li className="menus">Entrenamiento</li>
          <li className="menus">Repasa tus logros</li>
          <li className="menus">Dashboard</li>
          <li className="menus">Salir</li>
        </lu>
      </div>

      <div className="bg-gray-300 text-black p-3 rounded-lg shadow-md w-1/3">
        <h1 className="p-2">Teniendo en cuenta el siguiente planteamiento, genera tres resultados donde uno sea correcto:</h1>
        <p className="max-w-lg mx-auto bg-blue-300 p-3 text-black rounded-md w-auto">
         
          Tus tíos en Ibarra, Ecuador, invitan a ti y a tu hermano a pasar las vacaciones en su casa. Para celebrar tu cumpleaños,
          tu tía ha planeado asistir a un partido de fútbol en el estadio Olímpico Atahualpa en Quito. Tus tíos cubrirán las entradas,
          la noche en el hotel y la comida durante el partido, además de un recuerdo del equipo. Tienen un presupuesto total de $575.
          Tu tarea es calcular el costo de las entradas, la comida, el transporte del hotel al estadio y de vuelta, y el recuerdo del equipo.
          También debes determinar los horarios de salida y regreso al hotel.


        </p>
        <p className="max-w-lg mx-auto bg-blue-300 p-3 text-black rounded-md">

          INFORMACIÓN RESPECTO A LOS PRECIOS: <br />
          Ten presente que todos deben estar ubicados en la misma sección. <br />
          Sección de admisión general: $22,50 <br />
          Sección 4: $29 <br />
          Sección 3: $46,75 <br />
          Sección 2: $61,25 <br />
          Sección 1: $82 <br />Camiseta oficial del equipo: $45 <br />
          Cachucha estampada: $22 <br />
          Camiseta sin estampado: $15 <br />
          Saco: $52 <br />Bufanda: $26 <br />
          Comida (un pedazo de pizza, un helado y una limonada): $14,75 <br />
          El costo de un cuarto de hotel para cuatro personas: $239,95 <br />
          El costo de los trayectos (pasajes para tomar el transporte público): <br />
          Un trayecto por $3,25 <br />
          2 trayectos por $6 <br />
          10 trayectos por $26,50.
        </p>
      </div>
      <div>
        <button
          className="  bg-blue-300 hover:bg-blue-700 text-black p-4 font-bold rounded-lg "
          onClick={geminiCall}>
          Generar Respuesta
        </button>

      </div>

      <ul className="space-y-4 w-1/3 ">
        <li className="bg-gray-200 text-black p-4 rounded-lg shadow-md">

          <strong className="text-black pr-4">Respuesta 1:</strong>
          <h6 className="text-black">{correctAnswer}</h6>
        </li>
        <li className="bg-gray-200 text-black p-4 rounded-lg shadow-md">

          <strong className="text-black pr-4">Respuesta 2:</strong>
          <h6 className="text-black">{wrongAnswer1}</h6>
        </li>
        <li className="bg-gray-200 text-black p-4 rounded-lg shadow-md">

          <strong className="text-black pr-4 grow">Respuesta 3:</strong>
          <h6 className="text-black">{wrongAnswer2}</h6>
        </li>
      </ul>
    </section>
  );
}
