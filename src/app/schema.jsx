
// Pasar a otro archivo
import { SchemaType } from "@google/generative-ai";
export const schema = {
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
