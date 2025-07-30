document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value.trim();
  const password = document.getElementById('password').value.trim();
  const mensaje = document.getElementById('mensaje');
  mensaje.textContent = "🔍 Consultando...";

  try {
    const response = await fetch('https://registro-ip-render.onrender.com/consultar_ip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, password })
    });

    const data = await response.json();

    if (response.ok && data && data.ip) {
      mensaje.textContent = "✅ Redirigiendo...";
      window.location.href = `http://${data.ip}:5000/video`;
    } else {
      mensaje.textContent = "❌ Usuario o contraseña incorrectos.";
    }
  } catch (err) {
    console.error(err);
    mensaje.textContent = "❌ Error al conectar con el servidor.";
  }
});
