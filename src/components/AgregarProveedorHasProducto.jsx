import React, { useState, useEffect } from 'react';

function AgregarProveedorHasProducto({ relaciones, setRelaciones, onAdd, onUpdate, editingRelacion, setEditingRelacion }) {
  const [form, setForm] = useState({ Proveedor_codigo: '', Productos_SKU: '', Productos_descripcion_modelo: '' });

  useEffect(() => {
    if (editingRelacion) {
      setForm(editingRelacion);
    } else {
      setForm({ Proveedor_codigo: '', Productos_SKU: '', Productos_descripcion_modelo: '' });
    }
  }, [editingRelacion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingRelacion) {
      onUpdate(editingRelacion.Proveedor_codigo, editingRelacion.Productos_SKU, editingRelacion.Productos_descripcion_modelo, form);
    } else {
      onAdd(form);
    }
    setForm({ Proveedor_codigo: '', Productos_SKU: '', Productos_descripcion_modelo: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingRelacion ? 'Editar Relación Proveedor-Producto' : 'Agregar Relación Proveedor-Producto'}</h2>
      <div>
        <label>Proveedor Código:</label>
        <input type="number" name="Proveedor_codigo" value={form.Proveedor_codigo} onChange={handleChange} required />
      </div>
      <div>
        <label>Producto SKU:</label>
        <input type="number" name="Productos_SKU" value={form.Productos_SKU} onChange={handleChange} required />
      </div>
      <div>
        <label>Descripción Modelo:</label>
        <input type="text" name="Productos_descripcion_modelo" value={form.Productos_descripcion_modelo} onChange={handleChange} required />
      </div>
      <button type="submit">{editingRelacion ? 'Actualizar' : 'Agregar'}</button>
      {editingRelacion && (
        <button type="button" onClick={() => setEditingRelacion(null)}>Cancelar</button>
      )}
    </form>
  );
}

export default AgregarProveedorHasProducto;
