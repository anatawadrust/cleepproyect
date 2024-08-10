import request from 'supertest';
import { expect } from 'chai';
import app from '../server.js';

describe('Descripcion API', () => {

  it('Debe obtener todas las descripciones', (done) => {
    request(app)
      .get('/api/descripcion')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('Debe agregar una nueva descripcion', (done) => {
    const newDescripcion = {
      modelo: 'Modelo 1',
      descripcion: 'Descripción del modelo 1'
    };

    request(app)
      .post('/api/descripcion')
      .send(newDescripcion)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Descripcion added successfully');
        expect(res.body).to.have.property('id');
        done();
      });
  });

  it('Debe actualizar una descripcion existente', (done) => {
    const updateDescripcion = {
      descripcion: 'Descripción actualizada del modelo 1'
    };

    request(app)
      .put('/api/descripcion/Modelo1')
      .send(updateDescripcion)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Descripcion updated successfully');
        done();
      });
  });

  it('Debe eliminar una descripcion existente', (done) => {
    request(app)
      .delete('/api/descripcion/Modelo1')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Descripcion deleted successfully');
        done();
      });
  });

});
