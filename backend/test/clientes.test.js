import request from 'supertest';
import { expect } from 'chai';
import app from '../server.js';

describe('Clientes API', () => {

  it('Debe obtener todos los clientes - Verifica que la respuesta sea un array con estatus 200', (done) => {
    request(app)
      .get('/api/cliente')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200, 'El estado de respuesta debe ser 200 - OK');
        expect(res.body).to.be.an('array', 'La respuesta debe ser un array que contiene todos los clientes');
        done();
      });
  });

  it('Debe agregar un nuevo cliente - Verifica que se retorne un mensaje de éxito y un ID', (done) => {
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
        expect(res.statusCode).to.equal(201, 'El estado de respuesta debe ser 201 - Created');
        expect(res.body.message).to.equal('Cliente added successfully', 'El mensaje debe indicar que el cliente fue añadido exitosamente');
        
        // Verificación del ID del cliente
        expect(res.body).to.have.property('id').that.is.a('number', 'El ID del cliente debe ser un número');
        done();
      });
  });

  it('Debe actualizar un cliente existente - Verifica que se retorne un mensaje de éxito', (done) => {
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
        expect(res.statusCode).to.equal(200, 'El estado de respuesta debe ser 200 - OK');
        expect(res.body.message).to.equal('Cliente updated successfully', 'El mensaje debe indicar que el cliente fue actualizado exitosamente');
        done();
      });
  });

  it('Debe eliminar un cliente existente - Verifica que se retorne un mensaje de éxito', (done) => {
    request(app)
      .delete('/api/cliente/1')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200, 'El estado de respuesta debe ser 200 - OK');
        expect(res.body.message).to.equal('Cliente deleted successfully', 'El mensaje debe indicar que el cliente fue eliminado exitosamente');
        done();
      });
  });

});
