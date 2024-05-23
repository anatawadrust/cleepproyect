import React from 'react';

function ListaClientes({ clientes, onEditClick, onDeleteClick }) {
  return (
    <div className="card">
      <h2>Lista de Clientes</h2>
      <ul>
        <li className="header">
          <span>Nombre</span>
          <span>Apellido</span>
          <span>Correo</span>
          <span>Fecha de Nacimiento</span>
          <span>Teléfono</span>
          <span>País</span>
          <span>Ciudad</span>
          <span>Contraseña</span>
          <span>Acciones</span>
        </li>
        {clientes.map(cliente => (
          <li key={cliente.codigo}>
            <span>{cliente.nombre}</span>
            <span>{cliente.apellido}</span>
            <span>{cliente.correo}</span>
            <span>{cliente.fecha_nac}</span>
            <span>{cliente.telefono}</span>
            <span>{cliente.pais}</span>
            <span>{cliente.ciudad}</span>
            <span>{cliente.contrasena}</span>
            <span>
              <button onClick={() => onEditClick(cliente)} className="btn-edit">Editar</button>
              <button onClick={() => onDeleteClick(cliente.codigo)} className="btn-delete">Eliminar</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaClientes;
