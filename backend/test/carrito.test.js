import request from 'supertest';
import { expect } from 'chai';
import app from '../server.js';

describe('Carrito API', () => {

  it('Debe obtener todos los carritos', (done) => {
    request(app)
      .get('/api/carrito')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('Debe agregar un nuevo carrito', (done) => {
    const newCarrito = {
      cliente: 'Cliente 1',
      producto: 'Producto 1',
      proveedor_codigo: 1
    };

    request(app)
      .post('/api/carrito')
      .send(newCarrito)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Carrito added successfully');
        expect(res.body).to.have.property('id');
        done();
      });
  });

  it('Debe actualizar un carrito existente', (done) => {
    const updateCarrito = {
      cliente: 'Cliente 2',
      producto: 'Producto 2',
      proveedor_codigo: 2
    };

    request(app)
      .put('/api/carrito/1')
      .send(updateCarrito)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Carrito updated successfully');
        done();
      });
  });

  it('Debe eliminar un carrito existente', (done) => {
    request(app)
      .delete('/api/carrito/1')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Carrito deleted successfully');
        done();
      });
  });

});
