import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import "./Login.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const history = useHistory();

  const onSubmit = () => {;
    // eslint-disable-next-line no-unused-expressions
    email === 'lucero@gmail.com' && contraseña === '123' 
    ? history.push('/principal')
    : null
  };
  return (
    <form className="form-inner">
      <h3>Iniciar Sesión</h3>

      <div className="form-group">
        <input
          type="email"
          className="form-control"
          placeholder="Ingresa email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Ingresa Contraseña"
          onChange={(e) => {
            setContraseña(e.target.value);
          }}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-dark btn-lg btn-block"
      >
        Iniciar Sesión
      </button>
    </form>
    
  
  );
}

export default Login;
