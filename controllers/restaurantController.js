module.exports= (app, db)=>{
    app.get('/restaurants-page', (req, res)=>{
        res.render('pages/restaurantsPage.ejs');
    })

    app.get('/admin-page', (req, res)=>{
        res.render('pages/adminPage.ejs');
    })
}