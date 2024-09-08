import request from 'supertest'; //LIBRERIA 1
import { expect } from 'chai'; //LIBRERIA 2
import app from '../server.js';

describe('Carrito API', () => {

  it('Debe obtener todos los carritos - Verifica que la respuesta sea un array con estatus 200', (done) => {
    request(app)
      .get('/api/carrito')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200, 'El estado de respuesta debe ser 200 - OK');
        expect(res.body).to.be.an('array', 'La respuesta debe ser un array que contiene todos los carritos');
        done();
      });
  });

  it('Debe agregar un nuevo carrito - Verifica que se retorne un mensaje de éxito y un ID', (done) => {
    const newCarrito = {
      cliente: 'Cliente 1',
      producto: 'Producto 1',
      proveedor_codigo: 1
    };

    request(app)
      .post('/api/carrito')
      .send(newCarrito)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201, 'El estado de respuesta debe ser 201 - Created');
        expect(res.body.message).to.equal('Carrito added successfully', 'El mensaje debe indicar que el carrito fue añadido exitosamente');
        
        // Aquí está la corrección para la expectativa del ID
        expect(res.body).to.have.property('id').that.is.a('number', 'El ID del carrito debe ser un número');
        done();
      });
  });

  it('Debe actualizar un carrito existente - Verifica que se retorne un mensaje de éxito', (done) => {
    const updateCarrito = {
      cliente: 'Cliente 2',
      producto: 'Producto 2',
      proveedor_codigo: 2
    };

    request(app)
      .put('/api/carrito/1')
      .send(updateCarrito)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200, 'El estado de respuesta debe ser 200 - OK');
        expect(res.body.message).to.equal('Carrito updated successfully', 'El mensaje debe indicar que el carrito fue actualizado exitosamente');
        done();
      });
  });

  it('Debe eliminar un carrito existente - Verifica que se retorne un mensaje de éxito', (done) => {
    request(app)
      .delete('/api/carrito/1')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200, 'El estado de respuesta debe ser 200 - OK');
        expect(res.body.message).to.equal('Carrito deleted successfully', 'El mensaje debe indicar que el carrito fue eliminado exitosamente');
        done();
      });
  });

});
