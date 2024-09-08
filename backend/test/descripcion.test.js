import request from 'supertest';
import { expect } from 'chai';
import app from '../server.js';
import mysql from 'mysql2';

describe('Descripcion API', () => {

  // Se asegura de que la tabla 'descripcion' esté limpia antes de cada prueba
  beforeEach((done) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '', // Tu contraseña de MySQL
      database: 'cleep'
    });

    connection.query('DELETE FROM descripcion', (err) => {
      if (err) throw err;
      done();
    });
  });

  it('Debe obtener todas las descripciones - Verifica que la respuesta sea un array con estatus 200', (done) => {
    request(app)
      .get('/api/descripcion')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200, 'El estado de respuesta debe ser 200 - OK');
        expect(res.body).to.be.an('array', 'La respuesta debe ser un array que contiene todas las descripciones');
        done();
      });
  });

  it('Debe agregar una nueva descripcion - Verifica que se retorne un mensaje de éxito y un ID', (done) => {
    const newDescripcion = {
      modelo: 'Modelo 1',
      descripcion: 'Descripción del modelo 1'
    };

    request(app)
      .post('/api/descripcion')
      .send(newDescripcion)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201, 'El estado de respuesta debe ser 201 - Created');
        expect(res.body.message).to.equal('Descripcion added successfully', 'El mensaje debe indicar que la descripción fue añadida exitosamente');
        
        // Verificación del ID de la descripción
        expect(res.body).to.have.property('id').that.is.a('number', 'El ID de la descripción debe ser un número');
        done();
      });
  });

  it('Debe actualizar una descripcion existente - Verifica que se retorne un mensaje de éxito', (done) => {
    const updateDescripcion = {
      descripcion: 'Descripción actualizada del modelo 1'
    };

    request(app)
      .put('/api/descripcion/Modelo1')
      .send(updateDescripcion)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200, 'El estado de respuesta debe ser 200 - OK');
        expect(res.body.message).to.equal('Descripcion updated successfully', 'El mensaje debe indicar que la descripción fue actualizada exitosamente');
        done();
      });
  });

  it('Debe eliminar una descripcion existente - Verifica que se retorne un mensaje de éxito', (done) => {
    request(app)
      .delete('/api/descripcion/Modelo1')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200, 'El estado de respuesta debe ser 200 - OK');
        expect(res.body.message).to.equal('Descripcion deleted successfully', 'El mensaje debe indicar que la descripción fue eliminada exitosamente');
        done();
      });
  });

});
