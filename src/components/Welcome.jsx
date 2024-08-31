import React from 'react';
import './Welcome.css';

function Welcome({ onClose }) {
  return (
    <div className="welcome-overlay">
      <div className="welcome-container">
        <button onClick={onClose} className="welcome-close">&times;</button>
        <h1 className="welcome-title">Bienvenido a las tablas, Administrador</h1>
        <button onClick={onClose} className="welcome-button">Ingresar</button>
      </div>
    </div>
  );
}

export default Welcome;
