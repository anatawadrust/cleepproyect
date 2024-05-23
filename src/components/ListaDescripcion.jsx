import React from 'react';

function ListaDescripcion({ descripciones, onEditClick, onDeleteClick }) {
  return (
    <div className="card">
      <h2>Lista de Descripciones</h2>
      <ul>
        <li className="header">
          <span>Modelo</span>
          <span>Descripción</span>
          <span>Acciones</span>
        </li>
        {descripciones.map(descripcion => (
          <li key={descripcion.modelo}>
            <span>{descripcion.modelo}</span>
            <span>{descripcion.descripcion}</span>
            <span>
              <button onClick={() => onEditClick(descripcion)} className="btn-edit">Editar</button>
              <button onClick={() => onDeleteClick(descripcion.modelo)} className="btn-delete">Eliminar</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaDescripcion;
