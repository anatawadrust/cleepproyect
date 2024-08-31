import React, { useState } from 'react';
import { exportDataToCSV, importDataFromCSV } from '../services/api';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './ListaProveedorHasProductos.css';

function ListaProveedorHasProductos({ relaciones, onEditClick, onDeleteClick, setRelaciones }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRelaciones = relaciones.filter(relacion => 
    typeof relacion.Proveedor_codigo === 'string' && relacion.Proveedor_codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    typeof relacion.Productos_SKU === 'string' && relacion.Productos_SKU.toLowerCase().includes(searchTerm.toLowerCase()) ||
    typeof relacion.Productos_descripcion_modelo === 'string' && relacion.Productos_descripcion_modelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSVClick = () => {
    exportDataToCSV(relaciones, 'relaciones.csv');
  };

  const handleExportPDFClick = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '.relaciones-table' });
    doc.save('relaciones.pdf');
  };

  const handleImportChange = (e) => {
    importDataFromCSV(e.target.files[0]).then(data => setRelaciones(data));
  };

  return (
    <div className="card">
      <h2>Lista de Proveedor Has Productos</h2>
      <div className="search-and-actions">
        <input 
          type="text" 
          placeholder="Buscar relaciones..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleExportCSVClick} style={{ backgroundColor: 'green', color: 'white' }}>Exportar Relaciones (CSV)</button>
        <button onClick={handleExportPDFClick} style={{ backgroundColor: 'red', color: 'white' }}>Exportar Relaciones (PDF)</button>
        <input type="file" onChange={handleImportChange} />
      </div>
      <table className="relaciones-table">
        <thead>
          <tr>
            <th>Proveedor Código</th>
            <th>Productos SKU</th>
            <th>Productos Descripción Modelo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredRelaciones.map(relacion => (
            <tr key={`${relacion.Proveedor_codigo}-${relacion.Productos_SKU}-${relacion.Productos_descripcion_modelo}`}>
              <td>{relacion.Proveedor_codigo}</td>
              <td>{relacion.Productos_SKU}</td>
              <td>{relacion.Productos_descripcion_modelo}</td>
              <td>
                <button onClick={() => onEditClick(relacion)} className="btn-edit">Editar</button>
                <button onClick={() => onDeleteClick(relacion.Proveedor_codigo, relacion.Productos_SKU, relacion.Productos_descripcion_modelo)} className="btn-delete">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaProveedorHasProductos;
