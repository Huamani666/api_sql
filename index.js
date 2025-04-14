const express = require('express');
const sql = require('mssql');
const app = express();
const PORT = 3000;

// Configuración de la conexión
const config = {
    user: 'sa',
    password: '123456',
    server: '190.233.181.206', // o IP de tu servidor
    database: 'RestauranteDb',
    tabla: 'Productos',
    options: {
        encrypt: true, // si usas Azure; pon false si es local
        trustServerCertificate: true // true si usas SQL Server local sin certificado
    }
};

// Ruta GET para obtener datos
app.get('/Productos', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM Productos');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en la conexión a la base de datos');
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
