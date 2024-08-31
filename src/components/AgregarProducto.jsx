import React, { useState, useEffect } from 'react';

function AgregarProducto({ productos, setProductos, onAdd, onUpdate, editingProducto, setEditingProducto }) {
  const [form, setForm] = useState({ carrito_cod: '', descripcion_modelo: '', cantidad: '', precio: '' });

  useEffect(() => {
    if (editingProducto) {
      setForm(editingProducto);
    } else {
      setForm({ carrito_cod: '', descripcion_modelo: '', cantidad: '', precio: '' });
    }
  }, [editingProducto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProducto) {
      onUpdate(editingProducto.SKU, form);
    } else {
      onAdd(form);
    }
    setForm({ carrito_cod: '', descripcion_modelo: '', cantidad: '', precio: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingProducto ? 'Editar Producto' : 'Agregar Producto'}</h2>
      <div>
        <label>Carrito Cod:</label>
        <input type="number" name="carrito_cod" value={form.carrito_cod} onChange={handleChange} required />
      </div>
      <div>
        <label>Descripción Modelo:</label>
        <input type="text" name="descripcion_modelo" value={form.descripcion_modelo} onChange={handleChange} required />
      </div>
      <div>
        <label>Cantidad:</label>
        <input type="number" name="cantidad" value={form.cantidad} onChange={handleChange} required />
      </div>
      <div>
        <label>Precio:</label>
        <input type="number" step="0.01" name="precio" value={form.precio} onChange={handleChange} required />
      </div>
      <button type="submit">{editingProducto ? 'Actualizar' : 'Agregar'}</button>
      {editingProducto && (
        <button type="button" onClick={() => setEditingProducto(null)}>Cancelar</button>
      )}
    </form>
  );
}

export default AgregarProducto;
