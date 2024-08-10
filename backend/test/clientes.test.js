import request from 'supertest';
import { expect } from 'chai';
import app from '../server.js';

describe('Clientes API', () => {

  it('Debe obtener todos los clientes', (done) => {
    request(app)
      .get('/api/cliente')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('Debe agregar un nuevo cliente', (done) => {
    const newClient = {
      nombre: 'Juan',
      apellido: 'Perez',
      correo: 'juan@example.com',
      fecha_nac: '1990-01-01',
      telefono: '123456789',
      pais: 'Colombia',
      ciudad: 'Bogotá',
      contrasena: 'securepassword'
    };

    request(app)
      .post('/api/cliente')
      .send(newClient)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Cliente added successfully');
        expect(res.body).to.have.property('id');
        done();
      });
  });

  it('Debe actualizar un cliente existente', (done) => {
    const updateClient = {
      nombre: 'Carlos',
      apellido: 'Lopez',
      correo: 'carlos@example.com',
      fecha_nac: '1991-02-02',
      telefono: '987654321',
      pais: 'Colombia',
      ciudad: 'Medellín',
      contrasena: 'anotherpassword'
    };

    request(app)
      .put('/api/cliente/1')
      .send(updateClient)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Cliente updated successfully');
        done();
      });
  });

  it('Debe eliminar un cliente existente', (done) => {
    request(app)
      .delete('/api/cliente/1')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Cliente deleted successfully');
        done();
      });
  });

});
