import React, { useState } from 'react';
import { exportDataToCSV, importDataFromCSV } from '../services/api';
import './ListaCarrito.css';

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
      <table className="carritos-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Producto</th>
            <th>Proveedor Código</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredCarritos.map(carrito => (
            <tr key={carrito.cod}>
              <td>{carrito.cliente}</td>
              <td>{carrito.producto}</td>
              <td>{carrito.proveedor_codigo}</td>
              <td>
                <button onClick={() => onEditClick(carrito)} className="btn-edit">Editar</button>
                <button onClick={() => onDeleteClick(carrito.cod)} className="btn-delete">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaCarrito;
