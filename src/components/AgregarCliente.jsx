import React, { useState, useEffect } from 'react';

function AgregarCliente({ clientes, setClientes, onAdd, onUpdate, editingCliente, setEditingCliente }) {
  const [form, setForm] = useState({ nombre: '', apellido: '', correo: '', fecha_nac: '', telefono: '', pais: '', ciudad: '', contrasena: '' });

  useEffect(() => {
    if (editingCliente) {
      setForm(editingCliente);
    } else {
      setForm({ nombre: '', apellido: '', correo: '', fecha_nac: '', telefono: '', pais: '', ciudad: '', contrasena: '' });
    }
  }, [editingCliente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCliente) {
      onUpdate(editingCliente.codigo, form);
    } else {
      onAdd(form);
    }
    setForm({ nombre: '', apellido: '', correo: '', fecha_nac: '', telefono: '', pais: '', ciudad: '', contrasena: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingCliente ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
      <div>
        <label>Nombre:</label>
        <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
      </div>
      <div>
        <label>Apellido:</label>
        <input type="text" name="apellido" value={form.apellido} onChange={handleChange} required />
      </div>
      <div>
        <label>Correo:</label>
        <input type="email" name="correo" value={form.correo} onChange={handleChange} required />
      </div>
      <div>
        <label>Fecha de Nacimiento:</label>
        <input type="date" name="fecha_nac" value={form.fecha_nac} onChange={handleChange} required />
      </div>
      <div>
        <label>Teléfono:</label>
        <input type="text" name="telefono" value={form.telefono} onChange={handleChange} required />
      </div>
      <div>
        <label>País:</label>
        <input type="text" name="pais" value={form.pais} onChange={handleChange} required />
      </div>
      <div>
        <label>Ciudad:</label>
        <input type="text" name="ciudad" value={form.ciudad} onChange={handleChange} required />
      </div>
      <div>
        <label>Contraseña:</label>
        <input type="password" name="contrasena" value={form.contrasena} onChange={handleChange} required />
      </div>
      <button type="submit">{editingCliente ? 'Actualizar' : 'Agregar'}</button>
      {editingCliente && (
        <button type="button" onClick={() => setEditingCliente(null)}>Cancelar</button>
      )}
    </form>
  );
}

export default AgregarCliente;
