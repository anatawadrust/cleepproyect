import React, { useState } from 'react';
import { exportDataToCSV, importDataFromCSV } from '../services/api';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './ListaProveedores.css';

function ListaProveedores({ proveedores, onEditClick, onDeleteClick, setProveedores }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProveedores = proveedores.filter(proveedor => 
    proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proveedor.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proveedor.telefono.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSVClick = () => {
    exportDataToCSV(proveedores, 'proveedores.csv');
  };

  const handleExportPDFClick = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '.proveedores-table' });
    doc.save('proveedores.pdf');
  };

  const handleImportChange = (e) => {
    importDataFromCSV(e.target.files[0]).then(data => setProveedores(data));
  };

  return (
    <div className="card">
      <h2>Lista de Proveedores</h2>
      <div className="search-and-actions">
        <input 
          type="text" 
          placeholder="Buscar proveedores..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleExportCSVClick} style={{ backgroundColor: 'green', color: 'white' }}>Exportar Proveedores (CSV)</button>
        <button onClick={handleExportPDFClick} style={{ backgroundColor: 'red', color: 'white' }}>Exportar Proveedores (PDF)</button>
        <input type="file" onChange={handleImportChange} />
      </div>
      <table className="proveedores-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProveedores.map(proveedor => (
            <tr key={proveedor.codigo}>
              <td>{proveedor.nombre}</td>
              <td>{proveedor.contacto}</td>
              <td>{proveedor.telefono}</td>
              <td>{proveedor.direccion}</td>
              <td>
                <button onClick={() => onEditClick(proveedor)} className="btn-edit">Editar</button>
                <button onClick={() => onDeleteClick(proveedor.codigo)} className="btn-delete">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaProveedores;
