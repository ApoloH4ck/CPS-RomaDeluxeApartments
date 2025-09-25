import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Endpoint para consultas al LLM
app.post('/api/query', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch('https://api.generative.ai/v1/query', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para registrar actividades
app.post('/api/actividad', (req, res) => {
  const actividad = req.body;
  // Aquí podrías guardar en DB
  console.log('Actividad guardada:', actividad);
  res.json({ status: 'ok', actividad });
});

app.listen(PORT, () => console.log(`Backend corriendo en puerto ${PORT}`));
