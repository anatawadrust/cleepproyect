import React from 'react';

function ListaProductos({ productos, onEditClick, onDeleteClick }) {
  return (
    <div className="card">
      <h2>Lista de Productos</h2>
      <ul>
        <li className="header">
          <span>SKU</span>
          <span>Carrito Cod</span>
          <span>Descripción Modelo</span>
          <span>Cantidad</span>
          <span>Precio</span>
          <span>Acciones</span>
        </li>
        {productos.map(producto => (
          <li key={producto.SKU}>
            <span>{producto.SKU}</span>
            <span>{producto.carrito_cod}</span>
            <span>{producto.descripcion_modelo}</span>
            <span>{producto.cantidad}</span>
            <span>{producto.precio}</span>
            <span>
              <button onClick={() => onEditClick(producto)} className="btn-edit">Editar</button>
              <button onClick={() => onDeleteClick(producto.SKU)} className="btn-delete">Eliminar</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaProductos;
