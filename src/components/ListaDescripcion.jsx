import React, { useState } from 'react';
import { exportDataToCSV, importDataFromCSV } from '../services/api';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './ListaDescripcion.css';

function ListaDescripcion({ descripciones, onEditClick, onDeleteClick, setDescripciones }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDescripciones = descripciones.filter(descripcion => 
    descripcion.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    descripcion.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSVClick = () => {
    exportDataToCSV(descripciones, 'descripciones.csv');
  };

  const handleExportPDFClick = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '.descripciones-table' });
    doc.save('descripciones.pdf');
  };

  const handleImportChange = (e) => {
    importDataFromCSV(e.target.files[0]).then(data => setDescripciones(data));
  };

  return (
    <div className="card">
      <h2>Lista de Descripciones</h2>
      <div className="search-and-actions">
        <input 
          type="text" 
          placeholder="Buscar descripciones..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleExportCSVClick} style={{ backgroundColor: 'green', color: 'white' }}>Exportar Descripciones (CSV)</button>
        <button onClick={handleExportPDFClick} style={{ backgroundColor: 'red', color: 'white' }}>Exportar Descripciones (PDF)</button>
        <input type="file" onChange={handleImportChange} />
      </div>
      <table className="descripciones-table">
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredDescripciones.map(descripcion => (
            <tr key={descripcion.modelo}>
              <td>{descripcion.modelo}</td>
              <td>{descripcion.descripcion}</td>
              <td>
                <button onClick={() => onEditClick(descripcion)} className="btn-edit">Editar</button>
                <button onClick={() => onDeleteClick(descripcion.modelo)} className="btn-delete">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaDescripcion;
