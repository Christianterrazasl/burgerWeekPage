const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/dbConfig.js');


const Restaurant = sequelize.define('Restaurant', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    logoUrl:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '/uploads/defaultLogo.jpg' // Imagen por defecto
    }  
    },
    {
        timestamps: false
    });



module.exports = Restaurant;
