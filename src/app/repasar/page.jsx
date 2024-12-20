"use client";
import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import SideNav from "../components/side-nav";

// Configuración del modelo de Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_GEMINI_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: { 
    responseMimeType: "application/json",
  },
});

export default function Repasar() {
  const fixedPrompt = `
  Genera un problema matemático contextual en el que se deba decidir si la solución requiere suma, resta, multiplicación o división.
  Responde en el siguiente formato JSON:
  {
    "planteamiento": "Descripción del problema",
    "respuestas": [
      { "respuesta": "Texto de respuesta", "correcta": true, "razonamiento": "Breve explicación" },
      { "respuesta": "Texto de respuesta", "correcta": false, "razonamiento": "Breve explicación" },
      { "respuesta": "Texto de respuesta", "correcta": false, "razonamiento": "Breve explicación" },
      { "respuesta": "Texto de respuesta", "correcta": false, "razonamiento": "Breve explicación" }
    ]
  }
`;


  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const geminiCall = async () => {
    setLoading(true);
    setFeedback(null);
    try {
      const result = await model.generateContent(fixedPrompt);
      const responseJSON = JSON.parse(result.response.text());

      if (responseJSON && responseJSON.planteamiento && responseJSON.respuestas) {
        setQuestion(responseJSON.planteamiento);
        setCorrectAnswer(
          responseJSON.respuestas.find((respuesta) => respuesta.correcta)
        );
        setAnswers(shuffleArray(responseJSON.respuestas));
      } else {
        console.error("La respuesta no está en el formato esperado.");
      }
    } catch (error) {
      console.error("Error procesando la respuesta:", error);
    }
    setLoading(false);
  };

  const shuffleArray = (array) => {
    return array
      .map((item) => ({ ...item, sortKey: Math.random() }))
      .sort((a, b) => a.sortKey - b.sortKey)
      .map((item) => ({ text: item.respuesta, correcta: item.correcta }));
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    if (answer.correcta) {
      setFeedback("¡Correcto!");
    } else {
      setFeedback(
        `Incorrecto. ${correctAnswer?.razonamiento || "Razón no disponible."}`
      );
    }
  };

  return (
    <div>
      <SideNav/>
      <section className="flex flex-col gap-6">
        {/* Sección de la pregunta */}
        <div className="bg-gray-300 text-black p-6 rounded-lg shadow-md w-full">
          <h1 className="text-xl font-bold mb-4">
            DESCUBRE LA OPERACIÓN MATEMÁTICA
          </h1>
          {question ? (
            <p className="bg-blue-300 p-3 rounded-md text-black">{question}</p>
          ) : (
            <p className="bg-blue-300 p-3 rounded-md text-black">
              Haz clic en "Generar Pregunta" para empezar.
            </p>
          )}
        </div>

        {/* Sección del botón */}
        <div className="flex justify-center">
          {loading ? (
            <img src="/reloj.gif" width={100} height={100} />
          ) : (
            <button
              className="bg-blue-300 hover:bg-blue-700 text-black p-4 font-bold rounded-lg"
              onClick={geminiCall}
            >
              Generar Pregunta
            </button>
          )}
        </div>

        {/* Sección de las respuestas */}
        {answers.length > 0 && (
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
                  <strong className="pr-4">Opción {index + 1}:</strong>
                  {answer.text}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Retroalimentación */}
        {feedback && (
          <div
            className={`p-4 rounded-lg text-center font-bold ${
              selectedAnswer?.correcta ? "bg-green-300" : "bg-red-300"
            }`}
          >
            {feedback}
          </div>
        )}
      </section>
    </div>
  );
}
