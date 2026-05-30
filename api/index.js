const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

app.use(express.json());

// Configuración de la base de datos usando las variables de entorno de Docker
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test'
};

// Ruta de prueba inicial
app.get('/', (req, res) => {
  res.json({ mensaje: '¡Hola! La API REST está funcionando correctamente 🚀' });
});

// Ruta para probar la conexión a MySQL
app.get('/status', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    res.json({ estado: 'Conexión a la Base de Datos exitosa 🐬' });
    await connection.end();
  } catch (error) {
    res.status(500).json({ estado: 'Error conectando a la BD', detalle: error.message });
  }
});

app.listen(port, () => {
  console.log(`API escuchando en el puerto ${port}`);
});