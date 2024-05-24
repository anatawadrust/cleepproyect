import React, { useState } from 'react';
import { exportDataToCSV, importDataFromCSV } from '../services/api';

function ListaProveedorHasProductos({ relaciones, onEditClick, onDeleteClick, setRelaciones }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRelaciones = relaciones.filter(relacion => 
    typeof relacion.Proveedor_codigo === 'string' && relacion.Proveedor_codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    typeof relacion.Productos_SKU === 'string' && relacion.Productos_SKU.toLowerCase().includes(searchTerm.toLowerCase()) ||
    typeof relacion.Productos_descripcion_modelo === 'string' && relacion.Productos_descripcion_modelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportClick = () => {
    exportDataToCSV(relaciones, 'relaciones.csv');
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
        <button onClick={handleExportClick}>Exportar Relaciones</button>
        <input type="file" onChange={handleImportChange} />
      </div>
      <ul>
        <li className="header">
          <span>Proveedor Código</span>
          <span>Productos SKU</span>
          <span>Productos Descripción Modelo</span>
          <span>Acciones</span>
        </li>
        {filteredRelaciones.map(relacion => (
          <li key={`${relacion.Proveedor_codigo}-${relacion.Productos_SKU}-${relacion.Productos_descripcion_modelo}`}>
            <span>{relacion.Proveedor_codigo}</span>
            <span>{relacion.Productos_SKU}</span>
            <span>{relacion.Productos_descripcion_modelo}</span>
            <span>
              <button onClick={() => onEditClick(relacion)} className="btn-edit">Editar</button>
              <button onClick={() => onDeleteClick(relacion.Proveedor_codigo, relacion.Productos_SKU, relacion.Productos_descripcion_modelo)} className="btn-delete">Eliminar</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaProveedorHasProductos;
