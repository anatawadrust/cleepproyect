import React, { useState } from 'react';
import { exportDataToCSV, importDataFromCSV } from '../services/api';

function ListaCarrito({ carritos, onEditClick, onDeleteClick, setCarritos }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCarritos = carritos.filter(carrito => 
    carrito.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    carrito.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(carrito.proveedor_codigo).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportClick = () => {
    exportDataToCSV(carritos, 'carritos.csv');
  };

  const handleImportChange = (e) => {
    importDataFromCSV(e.target.files[0]).then(data => setCarritos(data));
  };

  return (
    <div className="card">
      <h2>Lista de Carritos</h2>
      <div className="search-and-actions">
        <input 
          type="text" 
          placeholder="Buscar carritos..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleExportClick}>Exportar Carritos</button>
        <input type="file" onChange={handleImportChange} />
      </div>
      <ul>
        <li className="header">
          <span>Cliente</span>
          <span>Producto</span>
          <span>Proveedor Código</span>
          <span>Acciones</span>
        </li>
        {filteredCarritos.map(carrito => (
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
