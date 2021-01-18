const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'13070011',
    database:'database_powergym'
});
//Conexion a base de datos mysql
db.getConnection((err, connection) => {
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if(connection) connection.release();
    console.log('DB is Connected');
    return;
});

//utilizamos el modulo cors para la comunicacion de request enviados desde HTTP
app.use(cors());
//utilizamos el framework express para la construccion dede una app web
//.json es usado para analizar la solicitudes con cargas de tipo JSON
app.use(express.json());
//Utilizamos body-parser para poder acceder a la informacion de las peticiones
app.use(bodyParser.urlencoded({extended: true}));

//api para obtener datos de la bd
app.get('/api/get', (req, res)=>{

    const sqlSelect ="SELECT * FROM clientes"
   
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    } );
});
//api para insertar datos en la bd
app.post('/api/insert', (req, res)=>{

    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const genero = req.body.genero;
    const email = req.body.email;
    const telefono = req.body.telefono;
    const membresia = req.body.membresia;
    const entrenador = req.body.entrenador;
    const horario = req.body.horario;

    // const nuevoCliente ={
    //         nombre, 
    //         apellidos, 
    //         genero, 
    //         email, 
    //         telefono,
    //         membresia, 
    //         entrenador,
    //         horario
    //     };
    // console.log(nuevoCliente);

    const sqlInsert ="INSERT INTO clientes(nombre, apellidos, genero, email,telefono, membresia, entrenador, horario) VALUES (?,?,?,?,?,?,?,?)"
   
    db.query(sqlInsert, [nombre, apellidos, genero, email,telefono, membresia, entrenador, horario], (err, result) => {
        console.log(result)
    } );
});

// app.get('/',(req,res) =>{
//     const sqlInsert ="INSERT INTO clientes(nombre, apellidos, genero, email,telefono, membresia, entrenador, horario) VALUES ('Lucero','Acuna','Femenino','lucero@hotmail.com','454445455','Ponte fit', 'Michelle lewin','Vespertino') ;"
//     db.query(sqlInsert, (err,result) =>{
//         res.send("Hello world")
//     })

// })
//api para eliminar cliente en base al nombre
app.delete("/api/delete/:nombre", (req, res) => {
    const nom = req.params.nombre;
    const sqlDelete ="DELETE FROM clientes WHERE nombre = ?"
   
    db.query(sqlDelete, nom, (err, result) => {
        if (err) console.log(err)
        else console.log(result)
    });
});
//api para actualizar nombre de cliente
app.put("/api/update", (req, res) => {
    const nom = req.body.nombre;
    const memb = req.body.membresia;
    const sqlUpdate ="UPDATE clientes SET membresia = ? WHERE nombre = ?"
   
    db.query(sqlUpdate, [memb,nom], (err, result) => {
        if (err) console.log(err)
    });
});

app.listen(3001, () => {
    console.log('running server on port 3001')
})