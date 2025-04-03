const {Restaurant} = require('../models');
const upload = require('../config/upload');



module.exports= (app, db)=>{

    app.post('api/restaurant', upload.single('logo'), async (req, res)=>{
        try{
            const {nombre} = req.body;
            const logoUrl = req.file? '/uploads/'+req.file.filename : null;
            const newRestaurant =await Restaurant.create({nombre, logoUrl});
            res.status(201).json(newRestaurant);
        }catch(error){
            console.error("Error al crear el restaurante: ", error)
        }

        /*
            usar asi plz 
            <form action="/api/restaurant" method="POST" enctype="multipart/form-data">
                <input type="text" name="nombre" required>
                <input type="file" name="logo">
                <button type="submit">Crear Restaurante</button>
            </form>
        */ 
    })
}