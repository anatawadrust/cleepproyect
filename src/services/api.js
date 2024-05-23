import axios from 'axios';

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
