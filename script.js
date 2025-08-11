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

      // Crear interfaz de video dinámicamente
      document.body.innerHTML = `
        <div class="video-container">
          <video id="videoStream" autoplay controls>
            <source src="http://${data.ip}:5000/video" type="video/mp4">
            Tu navegador no soporta el video.
          </video>
          <div class="controls">
            <button id="btnAnterior">⏮</button>
            <button id="btnRetroceder">⏪</button>
            <button id="btnPlayPause">⏯</button>
            <button id="btnAdelantar">⏩</button>
            <button id="btnSiguiente">⏭</button>
          </div>
        </div>
      `;

      const video = document.getElementById('videoStream');
      const btnPlayPause = document.getElementById('btnPlayPause');

      document.getElementById('btnAnterior').addEventListener('click', () => video.currentTime -= 10);
      document.getElementById('btnRetroceder').addEventListener('click', () => video.currentTime -= 5);
      btnPlayPause.addEventListener('click', () => {
        if (video.paused) video.play();
        else video.pause();
      });
      document.getElementById('btnAdelantar').addEventListener('click', () => video.currentTime += 5);
      document.getElementById('btnSiguiente').addEventListener('click', () => video.currentTime += 10);
    } else {
      mensaje.textContent = "❌ Usuario o contraseña incorrectos.";
    }
  } catch (err) {
    console.error(err);
    mensaje.textContent = "❌ Error al conectar con el servidor.";
  }
});
