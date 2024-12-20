"use client";
import "../styles.css"
export default function Login() {
  // Función que maneja la redirección al hacer clic en el botón "Iniciar"
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    window.location.href = "/"; // Redirigir a la ruta
  };

  return (
    <div className="formulario-container">
      {/* Sección de imágenes */}
      <div className="imagenes">
        <img src="/mathquest3.png" alt="Imagen de letras" className="imagen-letras" />
        <img src="/mathquest4.png" alt="Logo de la página" className="logo" />
      </div>

      {/* Formulario */}
      <div className="Formulario">
        <div className="formulario-content">
          <h1>Inicio de sesión</h1>
          {/* Agregar el texto debajo del formulario */}
          <p className="math-quest-text">Math Quest</p>
          <form onSubmit={handleSubmit}>
            <div className="username">
              <input type="text" required />
              <label>Usuario</label>
            </div>
            <div className="contraseña">
              <input type="password" required />
              <label>Contraseña</label>
            </div>
            <div className="Recordar">¿Has olvidado la contraseña?</div>
            
            {/* El botón de "Iniciar" usará el onSubmit del formulario */}
            <input type="submit" value="Iniciar" />
            
            {/* Enlace para "Deseo registrarme" (mantiene el comportamiento con #) */}
            <div className="registrarse">
              <a href="#">Deseo registrarme</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
