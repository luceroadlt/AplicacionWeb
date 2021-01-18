import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Menu from "./Menu";

import { Button } from "react-bootstrap";

function App() {
  //setters y getters
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [genero, setGenero] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [membresia, setMembresia] = useState("");
  const [entrenador, setEntrenador] = useState("");
  const [horario, setHorario] = useState("");
  const [listaclientes, setListaClientes] = useState([]);

  const [newName, setNewName] = useState("");
//utilizamos useEfect para hacer uso codigo no permitido dentro del main body
  useEffect(() => {
    //se utiliza axios del lado del cliente pasa enviar peticiones a apis
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setListaClientes(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      nombre: nombre,
      apellidos: apellidos,
      genero: genero,
      email: email,
      telefono: telefono,
      membresia: membresia,
      entrenador: entrenador,
      horario: horario,
    });
    setListaClientes([
      ...listaclientes,
      {
        nombre: nombre,
        apellidos: apellidos,
        genero: genero,
        email: email,
        telefono: telefono,
        membresia: membresia,
        entrenador: entrenador,
        horario: horario,
      },
    ]);
  };

  const eliminarCliente = (nom) => {
    Axios.delete(`http://localhost:3001/api/delete/${nom}`);
    
  };

  const actualizarCliente = (nom) => {
    Axios.put("http://localhost:3001/api/update", {
      nombre: nom,
      membresia: newName,
    });
    setNewName("");
  };

  return (

    <div className="App">
    {/* <Menu></Menu> */}

      <header className="App-header">
        <h1>Registro de cliente</h1>
      </header>

      <form className="form">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={(e) => {
            setNombre(e.target.value);
          }}
        />
        <input
          type="text"
          name="apellidos"
          placeholder="Apellidos"
          onChange={(e) => {
            setApellidos(e.target.value);
          }}
        />
        <div>
          <label>Genero:</label>
          <input
            type="radio"
            name="genero"
            value="Mujer"
            onChange={(e) => {
              setGenero(e.target.value);
            }}
          />{" "}
          Mujer
          <input
            type="radio"
            name="genero"
            value="Hombre"
            onChange={(e) => {
              setGenero(e.target.value);
            }}
          />{" "}
          Hombre
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          name="telefono"
          placeholder="Telefono"
          onChange={(e) => {
            setTelefono(e.target.value);
          }}
        />
        <input
          type="text"
          name="telefono"
          placeholder="Membresia"
          onChange={(e) => {
            setMembresia(e.target.value);
          }}
        />
        <input
          type="text"
          name="entrenador"
          placeholder="Entrenador"
          onChange={(e) => {
            setEntrenador(e.target.value);
          }}
        />
        <input
          type="text"
          name="horario"
          placeholder="Horario"
          onChange={(e) => {
            setHorario(e.target.value);
          }}
        />

        <Button onClick={submitReview}>Agregar cliente</Button>
      </form>

        <div>
        {listaclientes.map((val) => {
          return (
            <div className="card">
              <p>
                {" "}
                Nombre: {val.nombre} {val.apellidos} <br />
                Genero: {val.genero} <br />
                Email: {val.email} <br />
                Telefono: {val.telefono} <br />
                Membresia: {val.membresia} <br />
                Entrenador: {val.entrenador} <br />
                Horario: {val.horario} <br />
              </p>
              <Button
                variant="Primary"
                onClick={() => {
                  eliminarCliente(val.nombre);
                }}
              >
                Eliminar
              </Button>
              <input
                type="Text"
                id="updateInput"
                placeholder="Actualizar membresia"
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
              />
              <Button
                onClick={() => {
                  actualizarCliente(val.nombre);
                }}
              >
                Modificar
              </Button>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default App;
