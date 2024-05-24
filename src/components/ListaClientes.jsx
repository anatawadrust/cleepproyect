import React, { useState } from 'react';
import { exportDataToCSV, importDataFromCSV } from '../services/api';

function ListaClientes({ clientes, onEditClick, onDeleteClick, setClientes }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClientes = clientes.filter(cliente => 
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportClick = () => {
    exportDataToCSV(clientes, 'clientes.csv');
  };

  const handleImportChange = (e) => {
    importDataFromCSV(e.target.files[0]).then(data => setClientes(data));
  };

  return (
    <div className="card">
      <h2>Lista de Clientes</h2>
      <div className="search-and-actions">
        <input 
          type="text" 
          placeholder="Buscar clientes..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleExportClick}>Exportar Clientes</button>
        <input type="file" onChange={handleImportChange} />
      </div>
      <ul>
        <li className="header">
          <span>Nombre</span>
          <span>Apellido</span>
          <span>Correo</span>
          <span>Fecha de Nacimiento</span>
          <span>Teléfono</span>
          <span>País</span>
          <span>Ciudad</span>
          <span>Contraseña</span>
          <span>Acciones</span>
        </li>
        {filteredClientes.map(cliente => (
          <li key={cliente.codigo}>
            <span>{cliente.nombre}</span>
            <span>{cliente.apellido}</span>
            <span>{cliente.correo}</span>
            <span>{cliente.fecha_nac}</span>
            <span>{cliente.telefono}</span>
            <span>{cliente.pais}</span>
            <span>{cliente.ciudad}</span>
            <span>{cliente.contrasena}</span>
            <span>
              <button onClick={() => onEditClick(cliente)} className="btn-edit">Editar</button>
              <button onClick={() => onDeleteClick(cliente.codigo)} className="btn-delete">Eliminar</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaClientes;
