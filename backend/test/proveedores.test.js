import request from 'supertest';
import { expect } from 'chai';
import app from '../server.js';

describe('Proveedores API', () => {

  it('Debe obtener todos los proveedores', (done) => {
    request(app)
      .get('/api/proveedor')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('Debe agregar un nuevo proveedor', (done) => {
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
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Proveedor added successfully');
        expect(res.body).to.have.property('id');
        done();
      });
  });

  it('Debe actualizar un proveedor existente', (done) => {
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
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Proveedor updated successfully');
        done();
      });
  });

  it('Debe eliminar un proveedor existente', (done) => {
    request(app)
      .delete('/api/proveedor/1')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Proveedor deleted successfully');
        done();
      });
  });

});
