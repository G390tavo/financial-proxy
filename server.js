// server.js

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 10000;

// Habilitar CORS para todos los orígenes
app.use(cors());

app.get('/', async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('URL faltante');
  }

  try {
    const response = await fetch(targetUrl);
    const html = await response.text();
    res.set('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('Error al obtener la URL:', error);
    res.status(500).send('Error al obtener la URL');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy activo en puerto ${PORT}`);
});
