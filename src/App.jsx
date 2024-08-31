import React, { useState, useEffect } from 'react';
import './App.css';
import {
  getClientes, addCliente, updateCliente, deleteCliente,
  getProveedores, addProveedor, updateProveedor, deleteProveedor,
  getCarrito, addCarrito, updateCarrito, deleteCarrito,
  getDescripcion, addDescripcion, updateDescripcion, deleteDescripcion,
  getProductos, addProducto, updateProducto, deleteProducto,
  getProveedorHasProductos, addProveedorHasProducto, updateProveedorHasProducto, deleteProveedorHasProducto
} from './services/api';
import AgregarCliente from './components/AgregarCliente';
import AgregarProveedor from './components/AgregarProveedor';
import ListaClientes from './components/ListaClientes';
import ListaProveedores from './components/ListaProveedores';
import AgregarCarrito from './components/AgregarCarrito';
import ListaCarrito from './components/ListaCarrito';
import AgregarDescripcion from './components/AgregarDescripcion';
import ListaDescripcion from './components/ListaDescripcion';
import AgregarProducto from './components/AgregarProducto';
import ListaProductos from './components/ListaProductos';
import AgregarProveedorHasProducto from './components/AgregarProveedorHasProducto';
import ListaProveedorHasProductos from './components/ListaProveedorHasProductos';
import Login from './components/Login';
import Welcome from './components/Welcome';

function App() {
  const [clientes, setClientes] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [carritos, setCarritos] = useState([]);
  const [descripciones, setDescripciones] = useState([]);
  const [productos, setProductos] = useState([]);
  const [relaciones, setRelaciones] = useState([]);
  const [editingCliente, setEditingCliente] = useState(null);
  const [editingProveedor, setEditingProveedor] = useState(null);
  const [editingCarrito, setEditingCarrito] = useState(null);
  const [editingDescripcion, setEditingDescripcion] = useState(null);
  const [editingProducto, setEditingProducto] = useState(null);
  const [editingRelacion, setEditingRelacion] = useState(null);
  const [currentSection, setCurrentSection] = useState('clientes');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [theme, setTheme] = useState('light');
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const clientesData = await getClientes();
          const proveedoresData = await getProveedores();
          const carritosData = await getCarrito();
          const descripcionesData = await getDescripcion();
          const productosData = await getProductos();
          const relacionesData = await getProveedorHasProductos();
          setClientes(clientesData);
          setProveedores(proveedoresData);
          setCarritos(carritosData);
          setDescripciones(descripcionesData);
          setProductos(productosData);
          setRelaciones(relacionesData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
  };

  const handleLogin = (isAuthenticated, email) => {
    setIsAuthenticated(isAuthenticated);
    setUserEmail(email);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

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

  const handleAddCarrito = async (nuevoCarrito) => {
    try {
      const addedCarrito = await addCarrito(nuevoCarrito);
      setCarritos([...carritos, { ...nuevoCarrito, cod: addedCarrito.id }]);
    } catch (error) {
      console.error('Error adding carrito:', error);
    }
  };

  const handleUpdateCarrito = async (cod, updatedCarrito) => {
    try {
      await updateCarrito(cod, updatedCarrito);
      setCarritos(carritos.map(carrito => (carrito.cod === cod ? { ...carrito, ...updatedCarrito } : carrito)));
      setEditingCarrito(null);
    } catch (error) {
      console.error('Error updating carrito:', error);
    }
  };

  const handleDeleteCarrito = async (cod) => {
    try {
      await deleteCarrito(cod);
      setCarritos(carritos.filter(carrito => carrito.cod !== cod));
    } catch (error) {
      console.error('Error deleting carrito:', error);
    }
  };

  const handleAddDescripcion = async (nuevaDescripcion) => {
    try {
      const addedDescripcion = await addDescripcion(nuevaDescripcion);
      setDescripciones([...descripciones, { ...nuevaDescripcion, modelo: addedDescripcion.id }]);
    } catch (error) {
      console.error('Error adding descripcion:', error);
    }
  };

  const handleUpdateDescripcion = async (modelo, updatedDescripcion) => {
    try {
      await updateDescripcion(modelo, updatedDescripcion);
      setDescripciones(descripciones.map(descripcion => (descripcion.modelo === modelo ? { ...descripcion, ...updatedDescripcion } : descripcion)));
      setEditingDescripcion(null);
    } catch (error) {
      console.error('Error updating descripcion:', error);
    }
  };

  const handleDeleteDescripcion = async (modelo) => {
    try {
      await deleteDescripcion(modelo);
      setDescripciones(descripciones.filter(descripcion => descripcion.modelo !== modelo));
    } catch (error) {
      console.error('Error deleting descripcion:', error);
    }
  };

  const handleAddProducto = async (nuevoProducto) => {
    try {
      const addedProducto = await addProducto(nuevoProducto);
      setProductos([...productos, { ...nuevoProducto, SKU: addedProducto.id }]);
    } catch (error) {
      console.error('Error adding producto:', error);
    }
  };

  const handleUpdateProducto = async (SKU, updatedProducto) => {
    try {
      await updateProducto(SKU, updatedProducto);
      setProductos(productos.map(producto => (producto.SKU === SKU ? { ...producto, ...updatedProducto } : producto)));
      setEditingProducto(null);
    } catch (error) {
      console.error('Error updating producto:', error);
    }
  };

  const handleDeleteProducto = async (SKU) => {
    try {
      await deleteProducto(SKU);
      setProductos(productos.filter(producto => producto.SKU !== SKU));
    } catch (error) {
      console.error('Error deleting producto:', error);
    }
  };

  const handleAddProveedorHasProducto = async (nuevaRelacion) => {
    try {
      const addedRelacion = await addProveedorHasProducto(nuevaRelacion);
      setRelaciones([...relaciones, { ...nuevaRelacion, id: addedRelacion.id }]);
    } catch (error) {
      console.error('Error adding proveedor_has_productos:', error);
    }
  };

  const handleUpdateProveedorHasProducto = async (Proveedor_codigo, Productos_SKU, Productos_descripcion_modelo, updatedRelacion) => {
    try {
      await updateProveedorHasProducto(Proveedor_codigo, Productos_SKU, Productos_descripcion_modelo, updatedRelacion);
      setRelaciones(relaciones.map(relacion => (
        relacion.Proveedor_codigo === Proveedor_codigo && 
        relacion.Productos_SKU === Productos_SKU && 
        relacion.Productos_descripcion_modelo === Productos_descripcion_modelo 
          ? { ...relacion, ...updatedRelacion } 
          : relacion
      )));
      setEditingRelacion(null);
    } catch (error) {
      console.error('Error updating proveedor_has_productos:', error);
    }
  };

  const handleDeleteProveedorHasProducto = async (Proveedor_codigo, Productos_SKU, Productos_descripcion_modelo) => {
    try {
      await deleteProveedorHasProducto(Proveedor_codigo, Productos_SKU, Productos_descripcion_modelo);
      setRelaciones(relaciones.filter(relacion => !(
        relacion.Proveedor_codigo === Proveedor_codigo && 
        relacion.Productos_SKU === Productos_SKU && 
        relacion.Productos_descripcion_modelo === Productos_descripcion_modelo
      )));
    } catch (error) {
      console.error('Error deleting proveedor_has_productos:', error);
    }
  };

  if (showWelcome && isAuthenticated) {
    return <Welcome onClose={() => setShowWelcome(false)} />;
  }

  return (
    <div className={`dashboard ${theme}`}>
      {isAuthenticated ? (
        <>
          <div className="sidebar">
            <h2>Menú</h2>
            <button onClick={toggleTheme}>Alternar Tema</button>
            <nav>
              <ul>
                <li><a href="#!" onClick={() => setCurrentSection('clientes')}>Clientes</a></li>
                <li><a href="#!" onClick={() => setCurrentSection('proveedores')}>Proveedores</a></li>
                <li><a href="#!" onClick={() => setCurrentSection('carritos')}>Carritos</a></li>
                <li><a href="#!" onClick={() => setCurrentSection('descripciones')}>Descripciones</a></li>
                <li><a href="#!" onClick={() => setCurrentSection('productos')}>Productos</a></li>
                <li><a href="#!" onClick={() => setCurrentSection('proveedor_has_productos')}>Proveedor Has Productos</a></li>
              </ul>
            </nav>
            <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
            <p>Has ingresado como: {userEmail}</p>
          </div>
          <div className="main-content">
            <div className="header">
              <h1><img src="Captura de pantalla 2024-06-15 153948.png" alt="" /> CLEEP-COM!</h1>
            </div>
            {currentSection === 'clientes' && (
              <div className="section">
                <ListaClientes 
                  clientes={clientes} 
                  onEditClick={setEditingCliente} 
                  onDeleteClick={handleDeleteCliente} 
                  setClientes={setClientes}
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
                  setProveedores={setProveedores}
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
            {currentSection === 'carritos' && (
              <div className="section">
                <ListaCarrito 
                  carritos={carritos} 
                  onEditClick={setEditingCarrito} 
                  onDeleteClick={handleDeleteCarrito} 
                  setCarritos={setCarritos}
                />
                <AgregarCarrito 
                  carritos={carritos} 
                  setCarritos={setCarritos} 
                  onAdd={handleAddCarrito} 
                  onUpdate={handleUpdateCarrito}
                  editingCarrito={editingCarrito}
                  setEditingCarrito={setEditingCarrito}
                />
              </div>
            )}
            {currentSection === 'descripciones' && (
              <div className="section">
                <ListaDescripcion 
                  descripciones={descripciones} 
                  onEditClick={setEditingDescripcion} 
                  onDeleteClick={handleDeleteDescripcion} 
                  setDescripciones={setDescripciones}
                />
                <AgregarDescripcion 
                  descripciones={descripciones} 
                  setDescripciones={setDescripciones} 
                  onAdd={handleAddDescripcion} 
                  onUpdate={handleUpdateDescripcion}
                  editingDescripcion={editingDescripcion}
                  setEditingDescripcion={setEditingDescripcion}
                />
              </div>
            )}
            {currentSection === 'productos' && (
              <div className="section">
                <ListaProductos 
                  productos={productos} 
                  onEditClick={setEditingProducto} 
                  onDeleteClick={handleDeleteProducto} 
                  setProductos={setProductos}
                />
                <AgregarProducto 
                  productos={productos} 
                  setProductos={setProductos} 
                  onAdd={handleAddProducto} 
                  onUpdate={handleUpdateProducto}
                  editingProducto={editingProducto}
                  setEditingProducto={setEditingProducto}
                />
              </div>
            )}
            {currentSection === 'proveedor_has_productos' && (
              <div className="section">
                <ListaProveedorHasProductos 
                  relaciones={relaciones} 
                  onEditClick={setEditingRelacion} 
                  onDeleteClick={handleDeleteProveedorHasProducto} 
                  setRelaciones={setRelaciones}
                />
                <AgregarProveedorHasProducto 
                  relaciones={relaciones} 
                  setRelaciones={setRelaciones} 
                  onAdd={handleAddProveedorHasProducto} 
                  onUpdate={handleUpdateProveedorHasProducto}
                  editingRelacion={editingRelacion}
                  setEditingRelacion={setEditingRelacion}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
