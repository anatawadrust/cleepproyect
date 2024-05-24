import React, { useState } from 'react';
import { exportDataToCSV, importDataFromCSV } from '../services/api';

function ListaProductos({ productos, onEditClick, onDeleteClick, setProductos }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProductos = productos.filter(producto => 
    typeof producto.SKU === 'string' && producto.SKU.toLowerCase().includes(searchTerm.toLowerCase()) ||
    typeof producto.carrito_cod === 'string' && producto.carrito_cod.toLowerCase().includes(searchTerm.toLowerCase()) ||
    typeof producto.descripcion_modelo === 'string' && producto.descripcion_modelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportClick = () => {
    exportDataToCSV(productos, 'productos.csv');
  };

  const handleImportChange = (e) => {
    importDataFromCSV(e.target.files[0]).then(data => setProductos(data));
  };

  return (
    <div className="card">
      <h2>Lista de Productos</h2>
      <div className="search-and-actions">
        <input 
          type="text" 
          placeholder="Buscar productos..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleExportClick}>Exportar Productos</button>
        <input type="file" onChange={handleImportChange} />
      </div>
      <ul>
        <li className="header">
          <span>SKU</span>
          <span>Carrito Código</span>
          <span>Descripción Modelo</span>
          <span>Cantidad</span>
          <span>Precio</span>
          <span>Acciones</span>
        </li>
        {filteredProductos.map(producto => (
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
