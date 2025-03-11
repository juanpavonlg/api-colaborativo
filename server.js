// Importamos el módulo 'express' para crear el servidor
const express = require("express");

// Inicializamos la aplicación de Express
const app = express();

// Hacemos que Express pueda manejar datos en formato JSON en las solicitudes
app.use(express.json());

// Generamos datos de prueba: un arreglo de objetos que representa una lista de usuarios
let usuarios = [
  { id: 1, nombre: "Juan", edad: 28 },
  { id: 2, nombre: "Ana", edad: 22 },
  { id: 3, nombre: "Luis", edad: 35 },
];

// Endpoint de bienvenida cuando un usuario accede a la raíz del servidor
app.get("/", (req, res) => {
  res.send("Bienvenido a la API REST con Express.js");
});

// Endpoint para obtener todos los usuarios en este caso utilizaremos Postman
app.get("/api/usuarios", (req, res) => {
  res.status(200).json(usuarios); // Devuelve la lista de usuarios con el código de estado HTTP 200 (OK)
});

// Endpoint para obtener un usuario específico por su ID
app.get("/api/usuarios/:id", (req, res) => {
  // Convertimos el parámetro de la URL a número
  const usuarioId = parseInt(req.params.id);

  // Buscamos el usuario en la lista por su ID
  const usuario = usuarios.find((u) => u.id === usuarioId);

  // Si el usuario no se encuentra, devolvemos un error 404 y enviamos un mensaje 'Usuario no encontrado '
  if (!usuario) return res.status(404).send("Usuario no encontrado");

  // Si el usuario existe, lo enviamos como respuesta en formato JSON
  res.status(200).json(usuario);
});

// Endpoint para crear un nuevo usuario
app.post("/api/usuarios", (req, res) => {
  // Extraemos los datos del cuerpo de la solicitud
  const { nombre, edad } = req.body;

  // Creamos un nuevo usuario con un ID único basado en la longitud del array + 1
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    edad,
  };

  // Agregamos el nuevo usuario a la lista con push
  usuarios.push(nuevoUsuario);

  // Respondemos con el usuario creado y el código de estado 201 (Created)
  res.status(201).json(nuevoUsuario);
});

// Endpoint para actualizar un usuario existente por su ID
app.put("/api/usuarios/:id", (req, res) => {
  // Buscamos el usuario en la lista por su ID
  const usuario = usuarios.find((u) => u.id === parseInt(req.params.id));

  // Si el usuario no existe, respondemos con un error 404 con el mensaje 'Usuario no encontrado'
  if (!usuario) return res.status(404).send("Usuario no encontrado");

  // Extraemos los nuevos valores del cuerpo de la solicitud
  const { nombre, edad } = req.body;

  // Actualizamos los valores del usuario, manteniendo los datos existentes si no se envían nuevos valores
  usuario.nombre = nombre || usuario.nombre;
  usuario.edad = edad || usuario.edad;

  // Respondemos con el usuario actualizado
  res.status(200).json(usuario);
});

// Endpoint para eliminar un usuario por su ID
app.delete("/api/usuarios/:id", (req, res) => {
  // Buscamos el índice del usuario en la lista
  const usuarioIndex = usuarios.findIndex(
    (u) => u.id === parseInt(req.params.id)
  );

  // Si el usuario no existe, respondemos con un error 404
  if (usuarioIndex === -1) return res.status(404).send("Usuario no encontrado");

  // Eliminamos el usuario del arreglo y lo almacenamos en una variable
  const usuarioEliminado = usuarios.splice(usuarioIndex, 1);

  // Respondemos con el usuario eliminado
  res.status(200).json(usuarioEliminado);
});

// Definimos el puerto en el que se ejecutará el servidor (usamos una variable de entorno o el puerto 3000 por defecto)
const PORT = process.env.PORT || 3000;

// Iniciamos el servidor y lo ponemos a escuchar en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
