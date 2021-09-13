const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');

require("dotenv").config({path: "variables.env"});

const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

   const error = validationResult(req);
   if (!error.isEmpty()) {
       return res.status(400).json({errores: error.array()});
   }

   try {
       const {email, password} = req.body;
       console.log("email y pasword del body =>", email, password);
       let usuario = await Usuario.findOne({ email });
       if(usuario){
           return res.status(400).json({message: "El usuario ya esta registrado"});
       }
       usuario = new Usuario(req.body);
       const salt = await bcryptjs.genSalt(10);
       usuario.password = await bcryptjs.hash(password, salt);
       await usuario.save();
       const payload = {
           usuario: {
               id: usuario.id,
           }
       }
       jwt.sign(payload, process.env.SECRETA, {expiresIn: 3600}, (error, token) => {
           console.log('TOKEN =>', token)
           if (error) throw error;
           res.json({ token: token })
       })

       //res.send("usuario guardado correctamente");
   } catch (error) {
       console.log(error);
       res.status(400).send("error al guardar")
       
   }
    
};

