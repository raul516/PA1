const usuarios = [
  { usuario: "admin", contrasena: "1234" },
  { usuario: "cliente", contrasena: "abcd" }
];

class Usuario {
  constructor(nombre) {
    this.nombre = nombre;
  }

  saludo() {
    return `Hola, ${this.nombre}`;
  }
}

Usuario.prototype.saludoExtendido = function () {
  return `¡Bienvenido nuevamente, ${this.nombre}!`;
};

const contador = (() => {
  let intentos = 0;
  return () => ++intentos;
})();

const cuentaRegresiva = (segundos) => {
  if (segundos === 0) {
    window.location.href = "pagina.html";
    return;
  }
  console.log(`Redirigiendo en ${segundos} segundos...`);
  setTimeout(() => cuentaRegresiva(segundos - 1), 500);
};

const intentosFallidos = new Map();

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("loginForm");
  const mensaje = document.getElementById("mensaje");

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const usuarioValido = usuarios.find(
      (u) => u.usuario === username && u.contrasena === password
    );

    if (usuarioValido) {
      const user = new Usuario(username);
      mensaje.style.color = "green";
      mensaje.textContent = user.saludoExtendido();

      sessionStorage.setItem("usuario", username);

      cuentaRegresiva(3);
    } else {
      let intentos = contador();
      intentosFallidos.set(username, intentos);
      mensaje.style.color = "red";
      mensaje.textContent = `Acceso denegado. Intentos: ${intentos}`;
    }
  });

  document.getElementById("username").addEventListener("focus", () => {
    console.log("Foco en campo usuario");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") console.log("Tecla Enter presionada");
  });

  window.addEventListener("scroll", () => {
    console.log("Desplazamiento detectado");
  });
});