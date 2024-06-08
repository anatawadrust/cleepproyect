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
      <table className="clientes-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Fecha de Nacimiento</th>
            <th>Teléfono</th>
            <th>País</th>
            <th>Ciudad</th>
            <th>Contraseña</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredClientes.map(cliente => (
            <tr key={cliente.codigo}>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido}</td>
              <td>{cliente.correo}</td>
              <td>{cliente.fecha_nac}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.pais}</td>
              <td>{cliente.ciudad}</td>
              <td>{cliente.contrasena}</td>
              <td>
                <button onClick={() => onEditClick(cliente)} className="btn-edit">Editar</button>
                <button onClick={() => onDeleteClick(cliente.codigo)} className="btn-delete">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaClientes;
