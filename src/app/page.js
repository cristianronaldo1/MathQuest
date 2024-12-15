"use client";

export default function Home() {
  console.log("TEST", process.env.NEXT_PUBLIC_TEST)
  return (
    <div className="flex-1 bg-gray-100 p-5 border-2 h-screen font-bold mt-10">
      {/* Encabezado principal */}
      <h1 className="text-3xl font-bold text-[#0c0a09]">¡Bienvenidos a MathQuest!</h1>
      <p className="mt-4 text-lg text-gray-600">
        ¿Estás listo para convertirte en un héroe matemático? MateQuest es una plataforma interactiva y gamificada 
        diseñada para llevar tus habilidades matemáticas al siguiente nivel mediante retos emocionantes inspirados en situaciones de la vida real. 🧠💡
      </p>

      {/* Sección: ¿Cómo funciona? */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-[#0c0a09] mb-4">¿Cómo funciona? 🚀</h2>
        <ol className="list-decimal list-inside text-gray-600 text-lg space-y-4">
          <li>
            <strong className="text-[#3f3f46]">¡Toma el reto! </strong> 
            Cada desafío te plantea una situación basada en un escenario real. 
            <span className="block mt-2 italic text-gray-500">Ejemplo: ¿Cuánto material necesitas para construir un parque infantil seguro? 🌳👩‍🔧</span>
          </li>
          <li>
            <strong className="text-[#3f3f46]">Resuelve el enigma con ayuda de la IA. </strong> 
            Nuestra poderosa inteligencia artificial genera tres posibles respuestas, de las cuales solo una es correcta. 
            Si eliges mal, la IA te dará retroalimentación detallada para que aprendas y mejores. 🔍📘
          </li>
          <li>
            <strong className="text-[#3f3f46]">¡Suma puntos y gana! </strong> 
            Cuando eliges correctamente, sumarás puntos y avanzarás en tu camino matemático. ¡Cada desafío resuelto te acerca a desbloquear logros y convertirte en un maestro de las matemáticas! 🌟💪
          </li>
        </ol>
      </section>

      {/* Sección: ¿Por qué MateQuest? */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-[#0c0a09] mb-4">¿Por qué MateQuest? 🏆</h2>
        <ul className="list-disc list-inside text-gray-600 text-lg space-y-4">
          <li>
            <strong className="text-[#3f3f46]">Aprendizaje emocionante y divertido: </strong>
            Los problemas aburridos ya son cosa del pasado. Aprende mientras te diviertes y resuelves retos reales.
          </li>
          <li>
            <strong className="text-[#3f3f46]">Adaptativo: </strong>
            La plataforma se ajusta a tus necesidades, ofreciéndote explicaciones claras y personalizadas.
          </li>
          <li>
            <strong className="text-[#3f3f46]">Recompensas: </strong>
            Suma puntos, sube niveles y desbloquea insignias mientras avanzas. ¡Tu progreso será visible y emocionante!
          </li>
        </ul>
      </section>
    </div>
  );
}
