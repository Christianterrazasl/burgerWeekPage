const {Restaurant, Hamburguesa, Calificacion} = require('../models/index.js');

    exports.postRestaurant = async (req, res)=>{
        try{
            const {nombre} = req.body;
            const logoUrl = req.file? '/uploads/'+req.file.filename : '/uploads/defaultLogo.jpg';
            await Restaurant.create({nombre, logoUrl});
            res.redirect('/admin');
            
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
    }

    exports.getRestaurantsPage = async(req,res)=>{
        try{
            const restaurants = await Restaurant.findAll({raw:true});
            res.render('pages/restaurantsPage', {restaurants});
        }
        catch(err){
            console.error("Error al obtener restaurantes: ",err);
        }
        
    }

    exports.updateRestaurant = async (req, res)=>{
        try {
            const { id } = req.params;
            const { nombre } = req.body;
            const logoUrl = req.file ? '/uploads/' + req.file.filename : '/uploads/defaultLogo.jpg';

            // Actualizar el restaurante en la base de datos
            const updatedRestaurant = await Restaurant.update(
                { nombre, logoUrl },
                { where: { id } }
            );

            if (updatedRestaurant[0] === 0) {
                return res.status(404).json({ message: 'Restaurante no encontrado' });
            }

            res.redirect('/admin');
            
        } catch (error) {
            console.error("Error al actualizar el restaurante: ", error);
            
        }
    }

    exports.deleteRestaurant = async (req, res)=>{
        try {
            const { id } = req.params;

            const restaurant = await Restaurant.findOne({ where: { id } });
            if (!restaurant) {
                return res.status(404).json({ message: 'Restaurante no encontrado' });
            }

            const hamburguesas = await Hamburguesa.findAll({ where: { idRestaurant: id } });
            hamburguesas.forEach(async (hamburguesa) => {
                await Calificacion.destroy({ where: { idHamburguesa: hamburguesa.id } });
            });

            await Hamburguesa.destroy({ where: { idRestaurant: id } });
            await Restaurant.destroy({ where: { id } });

            

            res.redirect('/admin');
            
        } catch (error) {
            console.error("Error al eliminar el restaurante: ", error);
            
        }
    }

    exports.getRestaurantById = async (req, res)=>{
        try {
            const { id } = req.params;

            // Obtener el restaurante por ID
            const restaurant = await Restaurant.findOne({ where: { id } });

            if (!restaurant) {
                return res.status(404).json({ message: 'Restaurante no encontrado' });
            }

            res.status(200).json(restaurant);
            
        } catch (error) {
            console.error("Error al obtener el restaurante: ", error);
            
        }
    }


    exports.getRestaurantAdminPage = async (req, res) => {
        try{
            const restaurants = await Restaurant.findAll({raw:true});
            res.render('pages/restaurantAdminPage', {restaurants});
        }
        catch(err){
            console.error("Error al obtener restaurantes: ",err);
        }
    }

    exports.getRestaurantFormPage = async (req, res) => {
        try {
            const { id } = req.params;
            if(id){
                const restaurant = await Restaurant.findOne({ where: { id } });
                if (!restaurant) {
                    return res.status(404).send('Restaurante no encontrado');
                }
                res.render('pages/restaurantFormPage', { restaurant });
            }else{
                res.render('pages/restaurantFormPage', { restaurant: null });
            }
        } catch (error) {
            console.error("Error al obtener el formulario del restaurante: ", error);
        }
    }