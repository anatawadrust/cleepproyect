import React, { useState, useEffect } from 'react';

function AgregarProveedor({ proveedores, setProveedores, onAdd, onUpdate, editingProveedor, setEditingProveedor }) {
  const [form, setForm] = useState({ nombre: '', contacto: '', telefono: '', direccion: '' });

  useEffect(() => {
    if (editingProveedor) {
      setForm(editingProveedor);
    } else {
      setForm({ nombre: '', contacto: '', telefono: '', direccion: '' });
    }
  }, [editingProveedor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProveedor) {
      onUpdate(editingProveedor.codigo, form);
    } else {
      onAdd(form);
    }
    setForm({ nombre: '', contacto: '', telefono: '', direccion: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingProveedor ? 'Editar Proveedor' : 'Agregar Proveedor'}</h2>
      <div>
        <label>Nombre:</label>
        <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
      </div>
      <div>
        <label>Contacto:</label>
        <input type="text" name="contacto" value={form.contacto} onChange={handleChange} required />
      </div>
      <div>
        <label>Teléfono:</label>
        <input type="text" name="telefono" value={form.telefono} onChange={handleChange} required />
      </div>
      <div>
        <label>Dirección:</label>
        <input type="text" name="direccion" value={form.direccion} onChange={handleChange} required />
      </div>
      <button type="submit">{editingProveedor ? 'Actualizar' : 'Agregar'}</button>
      {editingProveedor && (
        <button type="button" onClick={() => setEditingProveedor(null)}>Cancelar</button>
      )}
    </form>
  );
}

export default AgregarProveedor;
