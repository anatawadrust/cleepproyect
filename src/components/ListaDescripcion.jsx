import React, { useState } from 'react';
import { exportDataToCSV, importDataFromCSV } from '../services/api';

function ListaDescripcion({ descripciones, onEditClick, onDeleteClick, setDescripciones }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDescripciones = descripciones.filter(descripcion => 
    descripcion.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    descripcion.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportClick = () => {
    exportDataToCSV(descripciones, 'descripciones.csv');
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
        <button onClick={handleExportClick}>Exportar Descripciones</button>
        <input type="file" onChange={handleImportChange} />
      </div>
      <ul>
        <li className="header">
          <span>Modelo</span>
          <span>Descripción</span>
          <span>Acciones</span>
        </li>
        {filteredDescripciones.map(descripcion => (
          <li key={descripcion.modelo}>
            <span>{descripcion.modelo}</span>
            <span>{descripcion.descripcion}</span>
            <span>
              <button onClick={() => onEditClick(descripcion)} className="btn-edit">Editar</button>
              <button onClick={() => onDeleteClick(descripcion.modelo)} className="btn-delete">Eliminar</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaDescripcion;
