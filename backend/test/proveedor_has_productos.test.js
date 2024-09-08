import request from 'supertest';
import { expect } from 'chai';
import app from '../server.js';

describe('Proveedor-Has-Productos API', () => {

  it('Debe obtener todas las relaciones proveedor-producto - Verifica que la respuesta sea un array con estatus 200', (done) => {
    request(app)
      .get('/api/proveedor_has_productos')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200, 'El estado de respuesta debe ser 200 - OK');
        expect(res.body).to.be.an('array', 'La respuesta debe ser un array que contiene todas las relaciones proveedor-producto');
        done();
      });
  });

  it('Debe agregar una nueva relación proveedor-producto - Verifica que se retorne un mensaje de éxito y un ID', (done) => {
    const newRelacion = {
      Proveedor_codigo: 1,
      Productos_SKU: 1,
      Productos_descripcion_modelo: 'Modelo 1'
    };

    request(app)
      .post('/api/proveedor_has_productos')
      .send(newRelacion)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201, 'El estado de respuesta debe ser 201 - Created');
        expect(res.body.message).to.equal('Relacion proveedor-producto added successfully', 'El mensaje debe indicar que la relación fue añadida exitosamente');
        
        // Verificación del ID de la relación
        expect(res.body).to.have.property('id').that.is.a('number', 'El ID de la relación debe ser un número');
        done();
      });
  });

  it('Debe actualizar una relación proveedor-producto existente - Verifica que se retorne un mensaje de éxito', (done) => {
    const updateRelacion = {
      Productos_SKU: 2,
      Productos_descripcion_modelo: 'Modelo 2'
    };

    request(app)
      .put('/api/proveedor_has_productos/1/1/Modelo1')
      .send(updateRelacion)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200, 'El estado de respuesta debe ser 200 - OK');
        expect(res.body.message).to.equal('Relacion proveedor-producto updated successfully', 'El mensaje debe indicar que la relación fue actualizada exitosamente');
        done();
      });
  });

  it('Debe eliminar una relación proveedor-producto existente - Verifica que se retorne un mensaje de éxito', (done) => {
    request(app)
      .delete('/api/proveedor_has_productos/1/1/Modelo1')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200, 'El estado de respuesta debe ser 200 - OK');
        expect(res.body.message).to.equal('Relacion proveedor-producto deleted successfully', 'El mensaje debe indicar que la relación fue eliminada exitosamente');
        done();
      });
  });

});
