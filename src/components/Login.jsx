import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [inputCode, setInputCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isBlocked) {
      if (inputCode === verificationCode) {
        setError('');
        setIsBlocked(false);
        setAttempts(0);
        onLogin(true, email);
      } else {
        setError('Código de verificación incorrecto');
      }
    } else {
      if (
        (email === 'aramansebastian@gmail.com' && password === 'torontocanada') ||
        (email === 'rowenaaraman@gmail.com' && password === '1028860952XD') ||
        (email === 'luisfelipeq417@gmail.com' && password === 'fpacheco') ||
        (email === 'Felipe.vargascol@gmail.com' && password === 'vfelipe') ||
        (email === 'carlosherreraceet@gmail.com' && password === 'hcarlos') 
      ) {
        onLogin(true, email);
      } else {
        setError('Correo o contraseña incorrectos');
        setAttempts(attempts + 1);
        if (attempts + 1 >= 3) {
          setIsBlocked(true);
          generateVerificationCode();
        }
      }
    }
  };

  const generateVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(code);
    console.log(`Código de verificación enviado al correo: ${code}`);
    // Aquí iría la lógica para enviar el código al correo electrónico
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {isBlocked ? (
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Verificación de Seguridad</h2>
            <p>¿Estás intentando acceder sin mi permiso, pirobo? Si no, pon el código que se envió al correo.</p>
            <div>
              <label>Código de verificación:</label>
              <input 
                type="text" 
                value={inputCode} 
                onChange={(e) => setInputCode(e.target.value)} 
                required 
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit">Verificar</button>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Cleep Login</h2>
            <h2>(ADMINISTRADOR)</h2>
            <div>
              <label>Correo:</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div>
              <label>Contraseña:</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit">Iniciar Sesión</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
