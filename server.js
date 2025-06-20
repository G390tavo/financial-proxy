const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 10000;

// Middleware para permitir CORS desde cualquier origen
app.use(cors());

// Endpoint principal del proxy
app.get('/', async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('Error: Falta el parámetro ?url');
  }

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Upgrade-Insecure-Requests': '1',
        'DNT': '1'  // Do Not Track
      }
    });

    // Si no responde bien, reenviamos el error con el código
    if (!response.ok) {
      return res.status(response.status).send(`Error al acceder al recurso (${response.status})`);
    }

    const html = await response.text();
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('Error interno del proxy: ' + error.message);
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Proxy activo en puerto ${PORT}`);
});
