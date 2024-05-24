import React, { useState } from 'react';
import { exportDataToCSV, importDataFromCSV } from '../services/api';

function ListaProveedores({ proveedores, onEditClick, onDeleteClick, setProveedores }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProveedores = proveedores.filter(proveedor => 
    proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proveedor.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proveedor.telefono.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportClick = () => {
    exportDataToCSV(proveedores, 'proveedores.csv');
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
        <button onClick={handleExportClick}>Exportar Proveedores</button>
        <input type="file" onChange={handleImportChange} />
      </div>
      <ul>
        <li className="header">
          <span>Nombre</span>
          <span>Contacto</span>
          <span>Teléfono</span>
          <span>Dirección</span>
          <span>Acciones</span>
        </li>
        {filteredProveedores.map(proveedor => (
          <li key={proveedor.codigo}>
            <span>{proveedor.nombre}</span>
            <span>{proveedor.contacto}</span>
            <span>{proveedor.telefono}</span>
            <span>{proveedor.direccion}</span>
            <span>
              <button onClick={() => onEditClick(proveedor)} className="btn-edit">Editar</button>
              <button onClick={() => onDeleteClick(proveedor.codigo)} className="btn-delete">Eliminar</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaProveedores;
