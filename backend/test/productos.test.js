import request from 'supertest';
import { expect } from 'chai';
import app from '../server.js';

describe('Productos API', () => {

  it('Debe obtener todos los productos', (done) => {
    request(app)
      .get('/api/productos')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('Debe agregar un nuevo producto', (done) => {
    const newProducto = {
      carrito_cod: 1,
      descripcion_modelo: 'Modelo 1',
      cantidad: 10,
      precio: 100
    };

    request(app)
      .post('/api/productos')
      .send(newProducto)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Producto added successfully');
        expect(res.body).to.have.property('id');
        done();
      });
  });

  it('Debe actualizar un producto existente', (done) => {
    const updateProducto = {
      carrito_cod: 2,
      descripcion_modelo: 'Modelo 2',
      cantidad: 20,
      precio: 200
    };

    request(app)
      .put('/api/productos/1')
      .send(updateProducto)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Producto updated successfully');
        done();
      });
  });

  it('Debe eliminar un producto existente', (done) => {
    request(app)
      .delete('/api/productos/1')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Producto deleted successfully');
        done();
      });
  });

});
