import axios from 'axios';
import * as Papa from 'papaparse';
import { saveAs } from 'file-saver';

const api = axios.create({
  baseURL: '/api',
});

export const getClientes = async () => {
  try {
    const response = await api.get('/cliente');
    return response.data;
  } catch (error) {
    console.error('Error fetching clientes:', error);
    throw error;
  }
};

export const addCliente = async (nuevoCliente) => {
  try {
    const response = await api.post('/cliente', nuevoCliente);
    return response.data;
  } catch (error) {
    console.error('Error adding cliente:', error);
    throw error;
  }
};

export const updateCliente = async (codigo, updatedCliente) => {
  try {
    const response = await api.put(`/cliente/${codigo}`, updatedCliente);
    return response.data;
  } catch (error) {
    console.error('Error updating cliente:', error);
    throw error;
  }
};

export const deleteCliente = async (codigo) => {
  try {
    const response = await api.delete(`/cliente/${codigo}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting cliente:', error);
    throw error;
  }
};

export const getProveedores = async () => {
  try {
    const response = await api.get('/proveedor');
    return response.data;
  } catch (error) {
    console.error('Error fetching proveedores:', error);
    throw error;
  }
};

export const addProveedor = async (nuevoProveedor) => {
  try {
    const response = await api.post('/proveedor', nuevoProveedor);
    return response.data;
  } catch (error) {
    console.error('Error adding proveedor:', error);
    throw error;
  }
};

export const updateProveedor = async (codigo, updatedProveedor) => {
  try {
    const response = await api.put(`/proveedor/${codigo}`, updatedProveedor);
    return response.data;
  } catch (error) {
    console.error('Error updating proveedor:', error);
    throw error;
  }
};

export const deleteProveedor = async (codigo) => {
  try {
    const response = await api.delete(`/proveedor/${codigo}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting proveedor:', error);
    throw error;
  }
};

export const getCarrito = async () => {
  try {
    const response = await api.get('/carrito');
    return response.data;
  } catch (error) {
    console.error('Error fetching carrito:', error);
    throw error;
  }
};

export const addCarrito = async (nuevoCarrito) => {
  try {
    const response = await api.post('/carrito', nuevoCarrito);
    return response.data;
  } catch (error) {
    console.error('Error adding carrito:', error);
    throw error;
  }
};

export const updateCarrito = async (cod, updatedCarrito) => {
  try {
    const response = await api.put(`/carrito/${cod}`, updatedCarrito);
    return response.data;
  } catch (error) {
    console.error('Error updating carrito:', error);
    throw error;
  }
};

export const deleteCarrito = async (cod) => {
  try {
    const response = await api.delete(`/carrito/${cod}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting carrito:', error);
    throw error;
  }
};

export const getDescripcion = async () => {
  try {
    const response = await api.get('/descripcion');
    return response.data;
  } catch (error) {
    console.error('Error fetching descripcion:', error);
    throw error;
  }
};

export const addDescripcion = async (nuevaDescripcion) => {
  try {
    const response = await api.post('/descripcion', nuevaDescripcion);
    return response.data;
  } catch (error) {
    console.error('Error adding descripcion:', error);
    throw error;
  }
};

export const updateDescripcion = async (modelo, updatedDescripcion) => {
  try {
    const response = await api.put(`/descripcion/${modelo}`, updatedDescripcion);
    return response.data;
  } catch (error) {
    console.error('Error updating descripcion:', error);
    throw error;
  }
};

export const deleteDescripcion = async (modelo) => {
  try {
    const response = await api.delete(`/descripcion/${modelo}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting descripcion:', error);
    throw error;
  }
};

export const getProductos = async () => {
  try {
    const response = await api.get('/productos');
    return response.data;
  } catch (error) {
    console.error('Error fetching productos:', error);
    throw error;
  }
};

export const addProducto = async (nuevoProducto) => {
  try {
    const response = await api.post('/productos', nuevoProducto);
    return response.data;
  } catch (error) {
    console.error('Error adding producto:', error);
    throw error;
  }
};

export const updateProducto = async (SKU, updatedProducto) => {
  try {
    const response = await api.put(`/productos/${SKU}`, updatedProducto);
    return response.data;
  } catch (error) {
    console.error('Error updating producto:', error);
    throw error;
  }
};

export const deleteProducto = async (SKU) => {
  try {
    const response = await api.delete(`/productos/${SKU}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting producto:', error);
    throw error;
  }
};

export const getProveedorHasProductos = async () => {
  try {
    const response = await api.get('/proveedor_has_productos');
    return response.data;
  } catch (error) {
    console.error('Error fetching proveedor_has_productos:', error);
    throw error;
  }
};

export const addProveedorHasProducto = async (nuevaRelacion) => {
  try {
    const response = await api.post('/proveedor_has_productos', nuevaRelacion);
    return response.data;
  } catch (error) {
    console.error('Error adding proveedor_has_productos:', error);
    throw error;
  }
};

export const updateProveedorHasProducto = async (Proveedor_codigo, Productos_SKU, Productos_descripcion_modelo, updatedRelacion) => {
  try {
    const response = await api.put(`/proveedor_has_productos/${Proveedor_codigo}/${Productos_SKU}/${Productos_descripcion_modelo}`, updatedRelacion);
    return response.data;
  } catch (error) {
    console.error('Error updating proveedor_has_productos:', error);
    throw error;
  }
};

export const deleteProveedorHasProducto = async (Proveedor_codigo, Productos_SKU, Productos_descripcion_modelo) => {
  try {
    const response = await api.delete(`/proveedor_has_productos/${Proveedor_codigo}/${Productos_SKU}/${Productos_descripcion_modelo}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting proveedor_has_productos:', error);
    throw error;
  }
};

// Función para importar datos desde un archivo CSV
export const importDataFromCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (result) => {
        resolve(result.data);
      },
      header: true,
      error: (error) => {
        reject(error);
      }
    });
  });
};

// Función para exportar datos a CSV
export const exportDataToCSV = (data, filename) => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
};
