const {DataTypes} = require('sequelize');
const { sequelize } = require('../config/dbConfig');
const Hamburguesa = require('./hamburguesa');

const Calificacion = sequelize.define('Calificacion', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    rate:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    idHamburguesa:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    

},{timestamps:false});

Calificacion.belongsTo(Hamburguesa, { foreignKey:'idHamburguesa'});
Hamburguesa.hasMany(Calificacion, { foreignKey:'idHamburguesa'});


module.exports=Calificacion;