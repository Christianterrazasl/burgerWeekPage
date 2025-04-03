const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/dbConfig');
const Restaurant = require('./restaurant');

const Hamburguesa = sequelize.define('Hamburguesa', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull:false
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull: false
    },
    precio:{
        type: DataTypes.FLOAT,
        allowNull:false
    },
    imagenUrl:{
        type: DataTypes.STRING,
        allowNull: true
    },
    idRestaurante:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{timestamps:false});

Restaurant.hasMany(Hamburguesa, {foreignKey: 'idRestaurante' });
Hamburguesa.belongsTo(Restaurant, {foreignKey: 'idRestaurante'});

module.exports= Hamburguesa;