const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Proxy activo y funcionando.");
});

app.get("/?url=", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("Falta el parámetro 'url'");
  }

  try {
    const response = await fetch(url);
    const text = await response.text();
    res.send(text);
  } catch (err) {
    res.status(500).send("Error al intentar acceder a la URL.");
  }
});

app.listen(PORT, () => {
  console.log(`Proxy activo en puerto ${PORT}`);
});
