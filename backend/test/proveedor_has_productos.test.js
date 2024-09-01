import request from 'supertest';
import { expect } from 'chai';
import app from '../server.js';

describe('Proveedor-Has-Productos API', () => {

  it('Debe obtener todas las relaciones proveedor-producto', (done) => {
    request(app)
      .get('/api/proveedor_has_productos')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
        console.log('Resultado de obtener todos las entidades P-P:', res.body);
      });
  });

  it('Debe agregar una nueva relación proveedor-producto', (done) => {
    const newRelacion = {
      Proveedor_codigo: 1,
      Productos_SKU: 1,
      Productos_descripcion_modelo: 'Modelo 1'
    };

    request(app)
      .post('/api/proveedor_has_productos')
      .send(newRelacion)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Relacion proveedor-producto added successfully');
        expect(res.body).to.have.property('id');
        done();
        console.log('Resultado de agregar una nueva entidad P-P:', res.body);
      });
  });

  it('Debe actualizar una relación proveedor-producto existente', (done) => {
    const updateRelacion = {
      Productos_SKU: 2,
      Productos_descripcion_modelo: 'Modelo 2'
    };

    request(app)
      .put('/api/proveedor_has_productos/1/1/Modelo1')
      .send(updateRelacion)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Relacion proveedor-producto updated successfully');
        done();
        console.log('Resultado de actualizar una entidad P-P:', res.body);
      });
  });

  it('Debe eliminar una relación proveedor-producto existente', (done) => {
    request(app)
      .delete('/api/proveedor_has_productos/1/1/Modelo1')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Relacion proveedor-producto deleted successfully');
        done();
        console.log('Resultado de eliminar una entidad P-P:', res.body);
      });
  });

});
