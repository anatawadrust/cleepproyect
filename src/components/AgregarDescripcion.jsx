import React, { useState, useEffect } from 'react';

function AgregarDescripcion({ descripciones, setDescripciones, onAdd, onUpdate, editingDescripcion, setEditingDescripcion }) {
  const [form, setForm] = useState({ modelo: '', descripcion: '' });

  useEffect(() => {
    if (editingDescripcion) {
      setForm(editingDescripcion);
    } else {
      setForm({ modelo: '', descripcion: '' });
    }
  }, [editingDescripcion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingDescripcion) {
      onUpdate(editingDescripcion.modelo, form);
    } else {
      onAdd(form);
    }
    setForm({ modelo: '', descripcion: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingDescripcion ? 'Editar Descripción' : 'Agregar Descripción'}</h2>
      <div>
        <label>Modelo:</label>
        <input type="text" name="modelo" value={form.modelo} onChange={handleChange} required />
      </div>
      <div>
        <label>Descripción:</label>
        <input type="text" name="descripcion" value={form.descripcion} onChange={handleChange} required />
      </div>
      <button type="submit">{editingDescripcion ? 'Actualizar' : 'Agregar'}</button>
      {editingDescripcion && (
        <button type="button" onClick={() => setEditingDescripcion(null)}>Cancelar</button>
      )}
    </form>
  );
}

export default AgregarDescripcion;
