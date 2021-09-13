const mongoose = require("mongoose");
require("dotenv").config({path: "variables.env"});

const conectarDB = async () => {
    try{
        await mongoose.connect(process.env.STRING_SERVER_MONGO, {});
        console.log("conectado a mongo");

    } catch(error){
        console.log(error);
        process.exit(1); 
    }

};

module.exports = conectarDB;