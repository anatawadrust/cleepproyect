import request from 'supertest';
import { expect } from 'chai';
import app from '../server.js';

describe('Productos API', () => {

  it('Debe obtener todos los productos - Verifica que la respuesta sea un array con estatus 200', (done) => {
    request(app)
      .get('/api/productos')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200, 'El estado de respuesta debe ser 200 - OK');
        expect(res.body).to.be.an('array', 'La respuesta debe ser un array que contiene todos los productos');
        done();
      });
  });

  it('Debe agregar un nuevo producto - Verifica que se retorne un mensaje de éxito y un ID', (done) => {
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
        expect(res.statusCode).to.equal(201, 'El estado de respuesta debe ser 201 - Created');
        expect(res.body.message).to.equal('Producto added successfully', 'El mensaje debe indicar que el producto fue añadido exitosamente');
        
        // Verificación del ID del producto
        expect(res.body).to.have.property('id').that.is.a('number', 'El ID del producto debe ser un número');
        done();
      });
  });

  it('Debe actualizar un producto existente - Verifica que se retorne un mensaje de éxito', (done) => {
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
        expect(res.statusCode).to.equal(200, 'El estado de respuesta debe ser 200 - OK');
        expect(res.body.message).to.equal('Producto updated successfully', 'El mensaje debe indicar que el producto fue actualizado exitosamente');
        done();
      });
  });

  it('Debe eliminar un producto existente - Verifica que se retorne un mensaje de éxito', (done) => {
    request(app)
      .delete('/api/productos/1')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200, 'El estado de respuesta debe ser 200 - OK');
        expect(res.body.message).to.equal('Producto deleted successfully', 'El mensaje debe indicar que el producto fue eliminado exitosamente');
        done();
      });
  });

});
