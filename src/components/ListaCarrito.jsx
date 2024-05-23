import React from 'react';

function ListaCarrito({ carritos, onEditClick, onDeleteClick }) {
  return (
    <div className="card">
      <h2>Lista de Carritos</h2>
      <ul>
        <li className="header">
          <span>Cliente</span>
          <span>Producto</span>
          <span>Proveedor Código</span>
          <span>Acciones</span>
        </li>
        {carritos.map(carrito => (
          <li key={carrito.cod}>
            <span>{carrito.cliente}</span>
            <span>{carrito.producto}</span>
            <span>{carrito.proveedor_codigo}</span>
            <span>
              <button onClick={() => onEditClick(carrito)} className="btn-edit">Editar</button>
              <button onClick={() => onDeleteClick(carrito.cod)} className="btn-delete">Eliminar</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaCarrito;
