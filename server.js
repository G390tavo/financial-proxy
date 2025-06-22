const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

app.get('/', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send('Falta el parámetro "url"');
  }

  try {
    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error al obtener contenido');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy activo en puerto ${PORT}`);
});
