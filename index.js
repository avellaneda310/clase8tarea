const express = require('express');
const app = express();
const conectarDB = require("./config/bd");


require('dotenv').config({path:`variables.env`});
const port = process.env.PORT_SERVER || 5000;

conectarDB();

app.use(express.json({ extend: true }));

const home = require('./routes/home')
const usuarios = require("./routes/Usuarios");
const usuarioController = require("./controllers/usuarioController");

app.use('/', home);
app.use("/api/usuario", usuarios);


app.listen(port, () =>{
    console.log(`servidor en port ${port}`)
});