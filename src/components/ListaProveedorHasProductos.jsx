import React from 'react';

function ListaProveedorHasProductos({ relaciones, onEditClick, onDeleteClick }) {
  return (
    <div className="card">
      <h2>Lista de Relaciones Proveedor-Producto</h2>
      <ul>
        <li className="header">
          <span>Proveedor Código</span>
          <span>Producto SKU</span>
          <span>Descripción Modelo</span>
          <span>Acciones</span>
        </li>
        {relaciones.map(relacion => (
          <li key={`${relacion.Proveedor_codigo}-${relacion.Productos_SKU}-${relacion.Productos_descripcion_modelo}`}>
            <span>{relacion.Proveedor_codigo}</span>
            <span>{relacion.Productos_SKU}</span>
            <span>{relacion.Productos_descripcion_modelo}</span>
            <span>
              <button onClick={() => onEditClick(relacion)} className="btn-edit">Editar</button>
              <button onClick={() => onDeleteClick(relacion.Proveedor_codigo, relacion.Productos_SKU, relacion.Productos_descripcion_modelo)} className="btn-delete">Eliminar</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaProveedorHasProductos;
