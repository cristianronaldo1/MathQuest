"use client";
import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
//Importa al esquema desde el archivo
import { schema } from "../../schema";

console.log("Api de la ia", process.env.NEXT_PUBLIC_API_GEMINI_KEY);
console.log("Api de la TEST", process.env.NEXT_PUBLIC_TEST);

// Configuración del modelo de Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_GEMINI_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    // aqui utiliza el esquema importado.
    responseSchema: schema,
  },
});

export default function Reto1() {
  const fixedPrompt =
    "Teniendo en cuenta el siguiente planteamiento, genera tres resultados dos incorrectos y uno correcto: Dos de tus tíos que viven en Ecuador, en la ciudad de Ibarra, los invitan a tu hermano ya ti a pasar unos días en su casa en estas vacaciones. Tu cumpleaños Será pronto, por lo que tu tía ha decidido celebrarlo asistiendo a un partido de fútbol en el estadio Olímpico Atahualpa (en la ciudad de Quito). Tus tíos pagarán las cuatro boletas del partido, la noche en el hotel y la comida que consumirán durante. el Partido. Además, quieres regalarte un recuerdo del equipo para tu cumpleaños. Para ello, tus tíos han destinado un presupuesto total de $575 (la moneda oficial en Ecuador es el dólar). las cuatro boletas para ir al partido de fútbol, el costo de la comida de los cuatro durante el partido, y los pasajes de transporte de los cuatro del hotel al estadio y de vuelta al hotel. recuerdo del equipo. Tus tíos también quieren que determine a qué hora tendrán que salir del hotel para ir al estadio ya qué hora estarán de vuelta. Información con respecto a los precios: Ten presente que todos deben estar ubicados en la misma sección. Sección de admisión general: $22,50 Sección 4: $29 Sección 3: $46,75 Sección 2: $61,25 Sección 1: $82 Camiseta oficial del equipo: $45 Cachucha estampada: $22 Camiseta sin estampado: $15 Saco: $52 Bufanda: $26 Comida (un pedazo de pizza, un helado y una limonada): $14,75 El costo de un cuarto de hotel para cuatro personas: $239,95 El costo de los trayectos (pasajes para tomar el transporte público): Un trayecto por $3,25, 2 trayectos por $6 y 10 por $26,50.";

  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const geminiCall = async () => {
    try {
      const result = await model.generateContent(fixedPrompt);
      const responseJSON = JSON.parse(result.response.text());

      if (Array.isArray(responseJSON)) {
        const correct = responseJSON.find((item) => item.correcta);
        const wrongs = responseJSON.filter((item) => !item.correcta);

        const shuffledAnswers = shuffleArray([
          { text: correct?.respuesta || "No disponible", correcta: true },
          { text: wrongs[0]?.respuesta || "No disponible", correcta: false },
          { text: wrongs[1]?.respuesta || "No disponible", correcta: false },
        ]);

        setAnswers(shuffledAnswers);
      } else {
        console.error("La respuesta no está en el formato esperado.");
      }
    } catch (error) {
      console.error("Error procesando la respuesta:", error);
    }
  };

  const shuffleArray = (array) => {
    return array
      .map((item) => ({ ...item, sortKey: Math.random() }))
      .sort((a, b) => a.sortKey - b.sortKey)
      .map((item) => ({ text: item.text, correcta: item.correcta }));
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer.correcta);
  };

  return (
    <section className="flex flex-col gap-6">
      {/* Sección de la pregunta */}
      <div className="bg-gray-300 text-black p-6 rounded-lg shadow-md w-full">
        <h1 className="text-xl font-bold mb-4">
          Teniendo en cuenta el siguiente planteamiento, genera tres resultados
          donde uno sea correcto:
        </h1>
        <p className="bg-blue-300 p-3 rounded-md text-black">
          Tus tíos en Ibarra, Ecuador, invitan a ti y a tu hermano a pasar las
          vacaciones en su casa. Para celebrar tu cumpleaños, tu tía ha planeado
          asistir a un partido de fútbol en el estadio Olímpico Atahualpa en
          Quito. Tus tíos cubrirán las entradas, la noche en el hotel y la comida
          durante el partido, además de un recuerdo del equipo. Tienen un
          presupuesto total de $575. Tu tarea es calcular el costo de las
          entradas, la comida, el transporte del hotel al estadio y de vuelta, y
          el recuerdo del equipo. También debes determinar los horarios de salida
          y regreso al hotel.
        </p>
        <p className="bg-blue-300 p-3 rounded-md text-black mt-4">
          <strong>INFORMACIÓN RESPECTO A LOS PRECIOS:</strong> <br />
          Sección de admisión general: $22,50 <br />
          Sección 4: $29 <br />
          Sección 3: $46,75 <br />
          Sección 2: $61,25 <br />
          Sección 1: $82 <br />
          Camiseta oficial del equipo: $45 <br />
          Cachucha estampada: $22 <br />
          Camiseta sin estampado: $15 <br />
          Saco: $52 <br />
          Bufanda: $26 <br />
          Comida (un pedazo de pizza, un helado y una limonada): $14,75 <br />
          El costo de un cuarto de hotel para cuatro personas: $239,95 <br />
          El costo de los trayectos (pasajes para tomar el transporte público):
          Un trayecto por $3,25, 2 trayectos por $6 y 10 trayectos por $26,50.
        </p>
      </div>

      {/* Sección del botón */}
      <div className="flex justify-center">
        <button
          className="bg-blue-300 hover:bg-blue-700 text-black p-4 font-bold rounded-lg"
          onClick={geminiCall}
        >
          Generar Respuesta
        </button>
      </div>

      {/* Sección de las respuestas */}
      <ul className="grid gap-4">
        {answers.map((answer, index) => (
          <li
            key={index}
            className="bg-gray-200 h-auto text-black p-4 rounded-lg shadow-md"
          >
            <button
              onClick={() => handleAnswerSelection(answer)}
              className="text-left w-full"
            >
              <strong className="pr-4">Respuesta {index + 1}:</strong>
              {answer.text}
            </button>
          </li>
        ))}
      </ul>

      {/* Resultado */}
      {selectedAnswer && (
        <div
          className={`p-4 rounded-lg text-center font-bold ${
            isCorrect ? "bg-green-300" : "bg-red-300"
          }`}
        >
          {isCorrect ? "¡Respuesta Correcta!" : "Respuesta Incorrecta"}
        </div>
      )}
    </section>
  );
}
