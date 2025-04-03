const {sequelize} = require('../config/dbConfig.js');
const Calificacion = require('./calificacion.js');
const Hamburguesa = require('./hamburguesa.js');
const Restaurant = require('./restaurant.js');

const db = {
    sequelize,    
    Restaurant,
    Hamburguesa,
    Calificacion
}

const syncDB = async ()=>{
    try{
        await sequelize.sync({alter:true});
        console.log("Base de datos sincronizada");
    }catch(err){
        console.error("Error al sincronizar la base de datos");
    }
}

syncDB();

module.exports = db;