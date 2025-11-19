import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Ruta de inicio de sesión para clientes
app.post('/log/sign-in/client', async (req, res) => {
  const { username, passwd } = req.body;
  console.log('[POST] /log/sign-in/client - Datos recibidos:', req.body);
  console.log('[POST] /log/sign-in/client', { username });

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      console.log('Usuario no encontrado:', username);
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    if (result.rows[0].passwd !== passwd) {
      console.log('Contraseña incorrecta para:', username);
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // No devolver la contraseña
    const { passwd: _, ...userData } = result.rows[0];
    console.log('Inicio de sesión exitoso:', username);
    res.status(200).json({ message: 'Inicio de sesión exitoso', user: userData });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// Ruta de registro de usuarios
app.post('/log/sign-up', async (req, res) => {
  const {
    name,
    lastName,
    lastSecondName,
    phone,
    address,
    username,
    passwd,
    dateOfB,
    explanation,
    lastGrade
  } = req.body;
  console.log('[POST] /log/sign-up - Datos recibidos:', req.body);
  console.log('[POST] /log/sign-up', { username });

  try {
    // Verificar si el username ya existe
    const userCheck = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (userCheck.rows.length > 0) {
      console.log('Nombre de usuario ya en uso:', username);
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    }

    // Insertar nuevo usuario
    const result = await pool.query(
      `INSERT INTO users (
        names, last_name, last_second_name, celphone, address,
        username, passwd, date_of_birth, explanation, last_grade
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        name,
        lastName,
        lastSecondName,
        phone,
        address,
        username,
        passwd,
        dateOfB,
        explanation,
        lastGrade
      ]
    );

    console.log('Usuario registrado exitosamente:', username);
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Rutas para clientes
app.post('/client/apply', async (req, res) => {
  const {
    names,
    last_name,
    last_second_name,
    celphone,
    address,
    username,
    passwd,
    date_of_birth,
    explanation,
    last_grade
  } = req.body;
  console.log('[POST] /client/apply - Datos recibidos:', req.body);
  console.log('[POST] /client/apply', { username });

  try {
    // Verificar si el username ya existe
    const userCheck = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (userCheck.rows.length > 0) {
      console.log('Nombre de usuario ya en uso:', username);
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    }

    // Insertar nuevo usuario
    const result = await pool.query(
      `INSERT INTO users (
        names, last_name, last_second_name, celphone, address,
        username, passwd, date_of_birth, explanation, last_grade
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        names,
        last_name,
        last_second_name,
        celphone,
        address,
        username,
        passwd,
        date_of_birth,
        explanation,
        last_grade
      ]
    );

    console.log('Solicitud enviada exitosamente:', username);
    res.status(201).json({
      message: 'Solicitud enviada exitosamente',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

app.get('/client/status/:username', async (req, res) => {
  const { username } = req.params;
  console.log('[GET] /client/status/:username - Params:', req.params);
  console.log('[GET] /client/status/:username', { username });

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      console.log('Usuario no encontrado para status:', username);
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    console.log('Status consultado para:', username);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al buscar el estado:', error);
    res.status(500).json({ error: 'Error al buscar el estado' });
  }
});

// Rutas para administradores
app.get('/admin/users', async (req, res) => {
  console.log('[GET] /admin/users');
  try {
    const result = await pool.query('SELECT * FROM users');
    console.log('Usuarios obtenidos:', result.rows.length);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

app.post('/admin/users', async (req, res) => {
  const {
    names,
    last_name,
    last_second_name,
    celphone,
    address,
    username,
    passwd,
    date_of_birth,
    explanation,
    last_grade
  } = req.body;
  console.log('[POST] /admin/users - Datos recibidos:', req.body);
  console.log('[POST] /admin/users', { username });

  try {
    const result = await pool.query(
      `INSERT INTO users (
        names, last_name, last_second_name, celphone, address,
        username, passwd, date_of_birth, explanation, last_grade
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        names,
        last_name,
        last_second_name,
        celphone,
        address,
        username,
        passwd,
        date_of_birth,
        explanation,
        last_grade
      ]
    );
    console.log('Usuario creado:', username);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

app.put('/admin/users/:id', async (req, res) => {
  const { id } = req.params;
  const {
    names,
    last_name,
    last_second_name,
    celphone,
    address,
    username,
    passwd,
    date_of_birth,
    explanation,
    last_grade
  } = req.body;
  console.log('[PUT] /admin/users/:id - Params:', req.params, 'Datos recibidos:', req.body);
  console.log('[PUT] /admin/users/:id', { id, username });

  try {
    const result = await pool.query(
      `UPDATE users SET
        names = $1,
        last_name = $2,
        last_second_name = $3,
        celphone = $4,
        address = $5,
        username = $6,
        passwd = $7,
        date_of_birth = $8,
        explanation = $9,
        last_grade = $10
      WHERE id = $11 RETURNING *`,
      [
        names,
        last_name,
        last_second_name,
        celphone,
        address,
        username,
        passwd,
        date_of_birth,
        explanation,
        last_grade,
        id
      ]
    );

    if (result.rows.length === 0) {
      console.log('Usuario no encontrado para actualizar:', id);
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    console.log('Usuario actualizado:', id);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

app.delete('/admin/users/:id', async (req, res) => {
  const { id } = req.params;
  console.log('[DELETE] /admin/users/:id - Params:', req.params);
  console.log('[DELETE] /admin/users/:id', { id });

  try {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      console.log('Usuario no encontrado para eliminar:', id);
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    console.log('Usuario eliminado:', id);
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});