const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 10000;

// === Seguridad y control ===
const ALLOWED_DOMAINS = ['google.com', 'bing.com', 'yahoo.com', 'duckduckgo.com', 'coingecko.com', 'coinmarketcap.com', 'investing.com', 'finance.yahoo.com'];

app.use(cors()); // Permitir a todos (puedes personalizar si deseas)
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const targetUrl = decodeURIComponent(req.query.url || '');

    if (!targetUrl.startsWith('http')) {
      return res.status(400).send('URL inválida');
    }

    const parsedDomain = new URL(targetUrl).hostname;
    const permitido = ALLOWED_DOMAINS.some(domain => parsedDomain.includes(domain));

    if (!permitido) {
      return res.status(403).send('Acceso denegado a este dominio');
    }

    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://www.google.com/',
        'Accept-Language': 'es-PE,es;q=0.9',
      },
      timeout: 8000,
    });

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'text/html; charset=UTF-8');
    res.status(200).send(response.data);

  } catch (error) {
    console.error('[Proxy Error]', error.message);
    res.status(500).send('Error al obtener contenido');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy activo en puerto ${PORT}`);
});
