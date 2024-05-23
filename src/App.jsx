import React, { useState, useEffect } from 'react';
import './App.css';
import { getClientes, addCliente, updateCliente, deleteCliente, getProveedores, addProveedor, updateProveedor, deleteProveedor } from './services/api';
import AgregarCliente from './components/AgregarCliente';
import AgregarProveedor from './components/AgregarProveedor';
import ListaClientes from './components/ListaClientes';
import ListaProveedores from './components/ListaProveedores';

function App() {
  const [clientes, setClientes] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [editingCliente, setEditingCliente] = useState(null);
  const [editingProveedor, setEditingProveedor] = useState(null);
  const [currentSection, setCurrentSection] = useState('clientes');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientesData = await getClientes();
        const proveedoresData = await getProveedores();
        setClientes(clientesData);
        setProveedores(proveedoresData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddCliente = async (nuevoCliente) => {
    try {
      const addedCliente = await addCliente(nuevoCliente);
      setClientes([...clientes, { ...nuevoCliente, codigo: addedCliente.id }]);
    } catch (error) {
      console.error('Error adding cliente:', error);
    }
  };

  const handleUpdateCliente = async (codigo, updatedCliente) => {
    try {
      await updateCliente(codigo, updatedCliente);
      setClientes(clientes.map(cliente => (cliente.codigo === codigo ? { ...cliente, ...updatedCliente } : cliente)));
      setEditingCliente(null);
    } catch (error) {
      console.error('Error updating cliente:', error);
    }
  };

  const handleDeleteCliente = async (codigo) => {
    try {
      await deleteCliente(codigo);
      setClientes(clientes.filter(cliente => cliente.codigo !== codigo));
    } catch (error) {
      console.error('Error deleting cliente:', error);
    }
  };

  const handleAddProveedor = async (nuevoProveedor) => {
    try {
      const addedProveedor = await addProveedor(nuevoProveedor);
      setProveedores([...proveedores, { ...nuevoProveedor, codigo: addedProveedor.id }]);
    } catch (error) {
      console.error('Error adding proveedor:', error);
    }
  };

  const handleUpdateProveedor = async (codigo, updatedProveedor) => {
    try {
      await updateProveedor(codigo, updatedProveedor);
      setProveedores(proveedores.map(proveedor => (proveedor.codigo === codigo ? { ...proveedor, ...updatedProveedor } : proveedor)));
      setEditingProveedor(null);
    } catch (error) {
      console.error('Error updating proveedor:', error);
    }
  };

  const handleDeleteProveedor = async (codigo) => {
    try {
      await deleteProveedor(codigo);
      setProveedores(proveedores.filter(proveedor => proveedor.codigo !== codigo));
    } catch (error) {
      console.error('Error deleting proveedor:', error);
    }
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Menú</h2>
        <nav>
          <ul>
            <li><a href="#!" onClick={() => setCurrentSection('clientes')}>Clientes</a></li>
            <li><a href="#!" onClick={() => setCurrentSection('proveedores')}>Proveedores</a></li>
          </ul>
        </nav>
      </div>
      <div className="main-content">
        <div className="header">
          <h1>Cleep.com!</h1>
        </div>
        {currentSection === 'clientes' && (
          <div className="section">
            <ListaClientes 
              clientes={clientes} 
              onEditClick={setEditingCliente} 
              onDeleteClick={handleDeleteCliente} 
            />
            <AgregarCliente 
              clientes={clientes} 
              setClientes={setClientes} 
              onAdd={handleAddCliente} 
              onUpdate={handleUpdateCliente}
              editingCliente={editingCliente}
              setEditingCliente={setEditingCliente}
            />
          </div>
        )}
        {currentSection === 'proveedores' && (
          <div className="section">
            <ListaProveedores 
              proveedores={proveedores} 
              onEditClick={setEditingProveedor} 
              onDeleteClick={handleDeleteProveedor} 
            />
            <AgregarProveedor 
              proveedores={proveedores} 
              setProveedores={setProveedores} 
              onAdd={handleAddProveedor} 
              onUpdate={handleUpdateProveedor}
              editingProveedor={editingProveedor}
              setEditingProveedor={setEditingProveedor}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
