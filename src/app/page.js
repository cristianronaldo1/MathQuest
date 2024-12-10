"use client";
import { useState } from "react";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Configuración del modelo de Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);

// Pasar a otro archivo
const schema = {
  description: "Lista de respuestas",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      respuesta: {
        type: SchemaType.STRING,
        description: "Texto de respuesta",
      },
      correcta: {
        type: SchemaType.BOOLEAN,
        description: "Es verdadero en caso que sea correcto o falso en caso que sea incorrecto",
      },
    },
    required: ["respuesta", "correcta"],
  },
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
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

      // Asegúrate de que la respuesta sea JSON parseable
      const responseJSON = JSON.parse(result.response.text());

      if (Array.isArray(responseJSON)) {
        // Encuentra las respuestas según el campo `correcta`
        const correct = responseJSON.find((item) => item.correcta);
        const wrongs = responseJSON.filter((item) => !item.correcta);

        // Asignar valores de manera segura
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
    <section>
      <h3>Primer reto</h3>
      <div>
        <h1>Teniendo en cuenta el siguiente planteamiento, genera tres resultados donde uno sea correcto:</h1>
        <p className="w-[750px] h-[300px] container mx-auto px-4 bg-slate-400 mb-3 p-4 rounded-md text-black flex justify-left">

          Tus tíos en Ibarra, Ecuador, invitan a ti y a tu hermano a pasar las vacaciones en su casa. Para celebrar tu cumpleaños, <br />
          tu tía ha planeado asistir a un partido de fútbol en el estadio Olímpico Atahualpa en Quito. Tus tíos cubrirán las entradas, <br />
          la noche en el hotel y la comida durante el partido, además de un recuerdo del equipo. Tienen un presupuesto total de $575.<br />
          Tu tarea es calcular el costo de las entradas, la comida, el transporte del hotel al estadio y de vuelta, y el recuerdo del equipo. <br />
          También debes determinar los horarios de salida y regreso al hotel.


        </p>
        <p className="w-[700px] h-[450px] container mx-auto px-4 bg-slate-400 mb-3 p-4 rounded-md text-black flex justify-between">

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
      <button
        className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
        onClick={geminiCall}
      >
        Generar Respuesta
      </button>
      <h2>
        <strong>Respuesta:</strong>
      </h2>
      <ul>
        <li>
          <strong>Respuesta Correcta:</strong> {correctAnswer}
        </li>
        <li>
          <strong>Respuesta Incorrecta 1:</strong> {wrongAnswer1}
        </li>
        <li>
          <strong>Respuesta Incorrecta 2:</strong> {wrongAnswer2}
        </li>
      </ul>
    </section>
  );
}
