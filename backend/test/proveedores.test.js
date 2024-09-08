import request from 'supertest';
import { expect } from 'chai';
import app from '../server.js';

describe('Proveedores API', () => {

  it('Debe obtener todos los proveedores - Verifica que la respuesta sea un array con estatus 200', (done) => {
    request(app)
      .get('/api/proveedor')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200, 'El estado de respuesta debe ser 200 - OK');
        expect(res.body).to.be.an('array', 'La respuesta debe ser un array que contiene todos los proveedores');
        done();
      });
  });

  it('Debe agregar un nuevo proveedor - Verifica que se retorne un mensaje de éxito y un ID', (done) => {
    const newProveedor = {
      nombre: 'Proveedor 1',
      contacto: 'Contacto 1',
      telefono: '987654321',
      direccion: 'Calle Falsa 123'
    };

    request(app)
      .post('/api/proveedor')
      .send(newProveedor)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201, 'El estado de respuesta debe ser 201 - Created');
        expect(res.body.message).to.equal('Proveedor added successfully', 'El mensaje debe indicar que el proveedor fue añadido exitosamente');
        
        // Verificación del ID del proveedor
        expect(res.body).to.have.property('id').that.is.a('number', 'El ID del proveedor debe ser un número');
        done();
      });
  });

  it('Debe actualizar un proveedor existente - Verifica que se retorne un mensaje de éxito', (done) => {
    const updateProveedor = {
      nombre: 'Proveedor 2',
      contacto: 'Contacto 2',
      telefono: '123456789',
      direccion: 'Calle Verdadera 456'
    };

    request(app)
      .put('/api/proveedor/1')
      .send(updateProveedor)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200, 'El estado de respuesta debe ser 200 - OK');
        expect(res.body.message).to.equal('Proveedor updated successfully', 'El mensaje debe indicar que el proveedor fue actualizado exitosamente');
        done();
      });
  });

  it('Debe eliminar un proveedor existente - Verifica que se retorne un mensaje de éxito', (done) => {
    request(app)
      .delete('/api/proveedor/1')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200, 'El estado de respuesta debe ser 200 - OK');
        expect(res.body.message).to.equal('Proveedor deleted successfully', 'El mensaje debe indicar que el proveedor fue eliminado exitosamente');
        done();
      });
  });

});
