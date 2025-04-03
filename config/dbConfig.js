const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
    'burgerWeek',
    'postgres',
    'postgres',
    {
        host:'localhost',
        dialect:'postgres',
        logging:false
    }
)

async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log("Bd conectada");
    }catch(err){
        console.error("Error al conectar db: ", err);
    }
} 

testConnection()

module.exports={Sequelize, sequelize}