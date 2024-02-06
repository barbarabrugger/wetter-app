import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';

dotenv.config();
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/wetter/:stadt', async (req, res) => {
    const stadt = req.params.stadt;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${stadt}&appid=${apiKey}&units=metric&lang=de`;

    try {
        const apiResponse = await fetch(url);
        const apiData = await apiResponse.json();
        res.json(apiData);
    } catch (error) {
        console.error('Fehler beim Abrufen der Wetterdaten:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
