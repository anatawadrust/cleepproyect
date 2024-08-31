import React, { useState, useEffect } from 'react';

function AgregarCarrito({ carritos, setCarritos, onAdd, onUpdate, editingCarrito, setEditingCarrito }) {
  const [form, setForm] = useState({ cliente: '', producto: '', proveedor_codigo: '' });

  useEffect(() => {
    if (editingCarrito) {
      setForm(editingCarrito);
    } else {
      setForm({ cliente: '', producto: '', proveedor_codigo: '' });
    }
  }, [editingCarrito]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCarrito) {
      onUpdate(editingCarrito.cod, form);
    } else {
      onAdd(form);
    }
    setForm({ cliente: '', producto: '', proveedor_codigo: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingCarrito ? 'Editar Carrito' : 'Agregar Carrito'}</h2>
      <div>
        <label>Cliente:</label>
        <input type="text" name="cliente" value={form.cliente} onChange={handleChange} required />
      </div>
      <div>
        <label>Producto:</label>
        <input type="text" name="producto" value={form.producto} onChange={handleChange} required />
      </div>
      <div>
        <label>Proveedor Código:</label>
        <input type="number" name="proveedor_codigo" value={form.proveedor_codigo} onChange={handleChange} required />
      </div>
      <button type="submit">{editingCarrito ? 'Actualizar' : 'Agregar'}</button>
      {editingCarrito && (
        <button type="button" onClick={() => setEditingCarrito(null)}>Cancelar</button>
      )}
    </form>
  );
}

export default AgregarCarrito;
