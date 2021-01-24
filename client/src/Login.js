import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  return (
    <form>
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

      <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Recordarme
          </label>
        </div>
      </div>

      <button type="submit" className="btn btn-dark btn-lg btn-block">
        Iniciar Sesión
      </button>
      <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p>
    </form>
  );
}

export default Login;