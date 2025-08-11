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
      mensaje.textContent = "✅ Cargando video...";

      // Crear interfaz de video dinámicamente usando la URL ngrok completa
      document.body.innerHTML = `
        <div class="video-container">
          <img id="videoStream" src="${data.ip}/video_feed" width="640" height="480" style="border:1px solid black"/>
          <div class="controls">
            <button id="btnCamara">📷 Cámara</button>
          </div>
        </div>
      `;

      // Evento del botón "Cámara" (aún sin backend)
      document.getElementById('btnCamara').addEventListener('click', () => {
        alert("Botón de cámara presionado (funcionalidad pendiente)");
      });

    } else {
      mensaje.textContent = "❌ Usuario o contraseña incorrectos.";
    }
  } catch (err) {
    console.error(err);
    mensaje.textContent = "❌ Error al conectar con el servidor.";
  }
});
