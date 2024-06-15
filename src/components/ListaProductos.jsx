import React, { useState } from 'react';
import { exportDataToCSV, importDataFromCSV } from '../services/api';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './ListaProductos.css';

function ListaProductos({ productos, onEditClick, onDeleteClick, setProductos }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProductos = productos.filter(producto => 
    typeof producto.SKU === 'string' && producto.SKU.toLowerCase().includes(searchTerm.toLowerCase()) ||
    typeof producto.carrito_cod === 'string' && producto.carrito_cod.toLowerCase().includes(searchTerm.toLowerCase()) ||
    typeof producto.descripcion_modelo === 'string' && producto.descripcion_modelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSVClick = () => {
    exportDataToCSV(productos, 'productos.csv');
  };

  const handleExportPDFClick = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '.productos-table' });
    doc.save('productos.pdf');
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
        <button onClick={handleExportCSVClick} style={{ backgroundColor: 'green', color: 'white' }}>Exportar Productos (CSV)</button>
        <button onClick={handleExportPDFClick} style={{ backgroundColor: 'red', color: 'white' }}>Exportar Productos (PDF)</button>
        <input type="file" onChange={handleImportChange} />
      </div>
      <table className="productos-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Carrito Código</th>
            <th>Descripción Modelo</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProductos.map(producto => (
            <tr key={producto.SKU}>
              <td>{producto.SKU}</td>
              <td>{producto.carrito_cod}</td>
              <td>{producto.descripcion_modelo}</td>
              <td>{producto.cantidad}</td>
              <td>{producto.precio}</td>
              <td>
                <button onClick={() => onEditClick(producto)} className="btn-edit">Editar</button>
                <button onClick={() => onDeleteClick(producto.SKU)} className="btn-delete">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaProductos;
