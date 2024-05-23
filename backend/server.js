const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Tu contraseña de MySQL
  database: 'cleep' // Asegúrate de que el nombre de la base de datos es correcto
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Endpoint para obtener datos de la tabla clientes
app.get('/api/cliente', (req, res) => {
  connection.query('SELECT * FROM clientes', (err, results) => {
    if (err) {
      console.error('Error fetching clientes:', err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Endpoint para agregar un nuevo cliente
app.post('/api/cliente', (req, res) => {
  const { nombre, apellido, correo, fecha_nac, telefono, pais, ciudad, contrasena } = req.body;
  const query = 'INSERT INTO clientes (nombre, apellido, correo, fecha_nac, telefono, pais, ciudad, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [nombre, apellido, correo, fecha_nac, telefono, pais, ciudad, contrasena], (err, results) => {
    if (err) {
      console.error('Error adding cliente:', err);
      return res.status(500).send(err);
    }
    res.status(201).json({ message: 'Cliente added successfully', id: results.insertId });
  });
});

// Endpoint para actualizar un cliente existente
app.put('/api/cliente/:codigo', (req, res) => {
  const { codigo } = req.params;
  const { nombre, apellido, correo, fecha_nac, telefono, pais, ciudad, contrasena } = req.body;
  const query = 'UPDATE clientes SET nombre = ?, apellido = ?, correo = ?, fecha_nac = ?, telefono = ?, pais = ?, ciudad = ?, contrasena = ? WHERE codigo = ?';
  connection.query(query, [nombre, apellido, correo, fecha_nac, telefono, pais, ciudad, contrasena, codigo], (err, results) => {
    if (err) {
      console.error('Error updating cliente:', err);
      return res.status(500).send(err);
    }
    res.status(200).json({ message: 'Cliente updated successfully' });
  });
});

// Endpoint para eliminar un cliente existente
app.delete('/api/cliente/:codigo', (req, res) => {
  const { codigo } = req.params;
  const query = 'DELETE FROM clientes WHERE codigo = ?';
  connection.query(query, [codigo], (err, results) => {
    if (err) {
      console.error('Error deleting cliente:', err);
      return res.status(500).send(err);
    }
    res.status(200).json({ message: 'Cliente deleted successfully' });
  });
});

// Endpoint para obtener datos de la tabla proveedores
app.get('/api/proveedor', (req, res) => {
  connection.query('SELECT * FROM proveedor', (err, results) => {
    if (err) {
      console.error('Error fetching proveedores:', err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Endpoint para agregar un nuevo proveedor
app.post('/api/proveedor', (req, res) => {
  const { nombre, contacto, telefono, direccion } = req.body;
  const query = 'INSERT INTO proveedor (nombre, contacto, telefono, direccion) VALUES (?, ?, ?, ?)';
  connection.query(query, [nombre, contacto, telefono, direccion], (err, results) => {
    if (err) {
      console.error('Error adding proveedor:', err);
      return res.status(500).send(err);
    }
    res.status(201).json({ message: 'Proveedor added successfully', id: results.insertId });
  });
});

// Endpoint para actualizar un proveedor existente
app.put('/api/proveedor/:codigo', (req, res) => {
  const { codigo } = req.params;
  const { nombre, contacto, telefono, direccion } = req.body;
  const query = 'UPDATE proveedor SET nombre = ?, contacto = ?, telefono = ?, direccion = ? WHERE codigo = ?';
  connection.query(query, [nombre, contacto, telefono, direccion, codigo], (err, results) => {
    if (err) {
      console.error('Error updating proveedor:', err);
      return res.status(500).send(err);
    }
    res.status(200).json({ message: 'Proveedor updated successfully' });
  });
});

// Endpoint para eliminar un proveedor existente
app.delete('/api/proveedor/:codigo', (req, res) => {
  const { codigo } = req.params;
  const query = 'DELETE FROM proveedor WHERE codigo = ?';
  connection.query(query, [codigo], (err, results) => {
    if (err) {
      console.error('Error deleting proveedor:', err);
      return res.status(500).send(err);
    }
    res.status(200).json({ message: 'Proveedor deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
