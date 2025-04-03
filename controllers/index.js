module.exports = (app, db) => {
    require('./restaurantController.js')(app, db);
    require('./hamburguesaController.js')(app, db);
    require('./calificacionController.js')(app, db);
    

    app.get('/restaurants-page', (req, res)=>{
        res.render('pages/restaurantPage.ejs');
    })

    app.get('/admin-page', (req, res)=>{
        res.render('pages/adminPage.ejs');
    })
};