import React from 'react';

function ListaProveedores({ proveedores, onEditClick, onDeleteClick }) {
  return (
    <div className="card">
      <h2>Lista de Proveedores</h2>
      <ul>
        <li className="header">
          <span>Nombre</span>
          <span>Contacto</span>
          <span>Teléfono</span>
          <span>Dirección</span>
          <span>Acciones</span>
        </li>
        {proveedores.map(proveedor => (
          <li key={proveedor.codigo}>
            <span>{proveedor.nombre}</span>
            <span>{proveedor.contacto}</span>
            <span>{proveedor.telefono}</span>
            <span>{proveedor.direccion}</span>
            <span>
              <button onClick={() => onEditClick(proveedor)} className="btn-edit">Editar</button>
              <button onClick={() => onDeleteClick(proveedor.codigo)} className="btn-delete">Eliminar</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaProveedores;
