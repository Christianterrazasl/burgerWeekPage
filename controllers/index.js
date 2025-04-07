module.exports = (app, db) => {
    require('./restaurantController.js')(app, db);
    require('./hamburguesaController.js')(app, db);
    require('./calificacionController.js')(app, db);
};