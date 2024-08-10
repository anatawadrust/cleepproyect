import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import cron from 'node-cron';

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

// Automatización de tareas: Enviar reportes diarios
cron.schedule('0 0 * * *', () => {
  // Lógica para enviar reportes diarios
  console.log('Enviando reporte diario...');
  // Aquí puedes añadir la lógica para enviar correos electrónicos o generar reportes
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



// Endpoint para obtener datos de la tabla carrito
app.get('/api/carrito', (req, res) => {
  connection.query('SELECT * FROM carrito', (err, results) => {
    if (err) {
      console.error('Error fetching carrito:', err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Endpoint para agregar un nuevo carrito
app.post('/api/carrito', (req, res) => {
  const { cliente, producto, proveedor_codigo } = req.body;
  const query = 'INSERT INTO carrito (cliente, producto, proveedor_codigo) VALUES (?, ?, ?)';
  connection.query(query, [cliente, producto, proveedor_codigo], (err, results) => {
    if (err) {
      console.error('Error adding carrito:', err);
      return res.status(500).send(err);
    }
    res.status(201).json({ message: 'Carrito added successfully', id: results.insertId });
  });
});

// Endpoint para actualizar un carrito existente
app.put('/api/carrito/:cod', (req, res) => {
  const { cod } = req.params;
  const { cliente, producto, proveedor_codigo } = req.body;
  const query = 'UPDATE carrito SET cliente = ?, producto = ?, proveedor_codigo = ? WHERE cod = ?';
  connection.query(query, [cliente, producto, proveedor_codigo, cod], (err, results) => {
    if (err) {
      console.error('Error updating carrito:', err);
      return res.status(500).send(err);
    }
    res.status(200).json({ message: 'Carrito updated successfully' });
  });
});

// Endpoint para eliminar un carrito existente
app.delete('/api/carrito/:cod', (req, res) => {
  const { cod } = req.params;
  const query = 'DELETE FROM carrito WHERE cod = ?';
  connection.query(query, [cod], (err, results) => {
    if (err) {
      console.error('Error deleting carrito:', err);
      return res.status(500).send(err);
    }
    res.status(200).json({ message: 'Carrito deleted successfully' });
  });
});

// Endpoint para obtener datos de la tabla descripcion
app.get('/api/descripcion', (req, res) => {
  connection.query('SELECT * FROM descripcion', (err, results) => {
    if (err) {
      console.error('Error fetching descripcion:', err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Endpoint para agregar un nuevo descripcion
app.post('/api/descripcion', (req, res) => {
  const { modelo, descripcion } = req.body;
  const query = 'INSERT INTO descripcion (modelo, descripcion) VALUES (?, ?)';
  connection.query(query, [modelo, descripcion], (err, results) => {
    if (err) {
      console.error('Error adding descripcion:', err);
      return res.status(500).send(err);
    }
    res.status(201).json({ message: 'Descripcion added successfully', id: results.insertId });
  });
});

// Endpoint para actualizar un descripcion existente
app.put('/api/descripcion/:modelo', (req, res) => {
  const { modelo } = req.params;
  const { descripcion } = req.body;
  const query = 'UPDATE descripcion SET descripcion = ? WHERE modelo = ?';
  connection.query(query, [descripcion, modelo], (err, results) => {
    if (err) {
      console.error('Error updating descripcion:', err);
      return res.status(500).send(err);
    }
    res.status(200).json({ message: 'Descripcion updated successfully' });
  });
});

// Endpoint para eliminar un descripcion existente
app.delete('/api/descripcion/:modelo', (req, res) => {
  const { modelo } = req.params;
  const query = 'DELETE FROM descripcion WHERE modelo = ?';
  connection.query(query, [modelo], (err, results) => {
    if (err) {
      console.error('Error deleting descripcion:', err);
      return res.status(500).send(err);
    }
    res.status(200).json({ message: 'Descripcion deleted successfully' });
  });
});

// Endpoint para obtener datos de la tabla productos
app.get('/api/productos', (req, res) => {
  connection.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      console.error('Error fetching productos:', err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Endpoint para agregar un nuevo producto
app.post('/api/productos', (req, res) => {
  const { carrito_cod, descripcion_modelo, cantidad, precio } = req.body;
  const query = 'INSERT INTO productos (carrito_cod, descripcion_modelo, cantidad, precio) VALUES (?, ?, ?, ?)';
  connection.query(query, [carrito_cod, descripcion_modelo, cantidad, precio], (err, results) => {
    if (err) {
      console.error('Error adding producto:', err);
      return res.status(500).send(err);
    }
    res.status(201).json({ message: 'Producto added successfully', id: results.insertId });
  });
});

// Endpoint para actualizar un producto existente
app.put('/api/productos/:SKU', (req, res) => {
  const { SKU } = req.params;
  const { carrito_cod, descripcion_modelo, cantidad, precio } = req.body;
  const query = 'UPDATE productos SET carrito_cod = ?, descripcion_modelo = ?, cantidad = ?, precio = ? WHERE SKU = ?';
  connection.query(query, [carrito_cod, descripcion_modelo, cantidad, precio, SKU], (err, results) => {
    if (err) {
      console.error('Error updating producto:', err);
      return res.status(500).send(err);
    }
    res.status(200).json({ message: 'Producto updated successfully' });
  });
});

// Endpoint para eliminar un producto existente
app.delete('/api/productos/:SKU', (req, res) => {
  const { SKU } = req.params;
  const query = 'DELETE FROM productos WHERE SKU = ?';
  connection.query(query, [SKU], (err, results) => {
    if (err) {
      console.error('Error deleting producto:', err);
      return res.status(500).send(err);
    }
    res.status(200).json({ message: 'Producto deleted successfully' });
  });
});

// Endpoint para obtener datos de la tabla proveedor_has_productos
app.get('/api/proveedor_has_productos', (req, res) => {
  connection.query('SELECT * FROM proveedor_has_productos', (err, results) => {
    if (err) {
      console.error('Error fetching proveedor_has_productos:', err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Endpoint para agregar una nueva relación proveedor-producto
app.post('/api/proveedor_has_productos', (req, res) => {
  const { Proveedor_codigo, Productos_SKU, Productos_descripcion_modelo } = req.body;
  const query = 'INSERT INTO proveedor_has_productos (Proveedor_codigo, Productos_SKU, Productos_descripcion_modelo) VALUES (?, ?, ?)';
  connection.query(query, [Proveedor_codigo, Productos_SKU, Productos_descripcion_modelo], (err, results) => {
    if (err) {
      console.error('Error adding proveedor_has_productos:', err);
      return res.status(500).send(err);
    }
    res.status(201).json({ message: 'Relacion proveedor-producto added successfully', id: results.insertId });
  });
});

// Endpoint para actualizar una relación proveedor-producto existente
app.put('/api/proveedor_has_productos/:Proveedor_codigo/:Productos_SKU/:Productos_descripcion_modelo', (req, res) => {
  const { Proveedor_codigo, Productos_SKU, Productos_descripcion_modelo } = req.params;
  const query = 'UPDATE proveedor_has_productos SET Productos_SKU = ?, Productos_descripcion_modelo = ? WHERE Proveedor_codigo = ?';
  connection.query(query, [Productos_SKU, Productos_descripcion_modelo, Proveedor_codigo], (err, results) => {
    if (err) {
      console.error('Error updating proveedor_has_productos:', err);
      return res.status(500).send(err);
    }
    res.status(200).json({ message: 'Relacion proveedor-producto updated successfully' });
  });
});

// Endpoint para eliminar una relación proveedor-producto existente
app.delete('/api/proveedor_has_productos/:Proveedor_codigo/:Productos_SKU/:Productos_descripcion_modelo', (req, res) => {
  const { Proveedor_codigo, Productos_SKU, Productos_descripcion_modelo } = req.params;
  const query = 'DELETE FROM proveedor_has_productos WHERE Proveedor_codigo = ? AND Productos_SKU = ? AND Productos_descripcion_modelo = ?';
  connection.query(query, [Proveedor_codigo, Productos_SKU, Productos_descripcion_modelo], (err, results) => {
    if (err) {
      console.error('Error deleting proveedor_has_productos:', err);
      return res.status(500).send(err);
    }
    res.status(200).json({ message: 'Relacion proveedor-producto deleted successfully' });
  });
});

export default app;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});