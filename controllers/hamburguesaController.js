
const {Hamburguesa, Restaurant, Calificacion} = require('../models/index.js');

exports.getHamburguesasPage = async (req, res) => {
    try {
        const {idRestaurant} = req.params
        const restaurant = await Restaurant.findOne({ where: { id: idRestaurant } });
        const hamburguesas = await Hamburguesa.findAll({
            where: { idRestaurant }
        });
        res.render('pages/hamburguesasPage', { hamburguesas, restaurant });
    } catch (error) {
        console.error('Error al obtener hamburguesas:', error);
        res.status(500).send('Error al obtener la pagina de hamburguesas');
    }
}

exports.postHamburguesa = async (req, res) => {
    try {
        const { idRestaurant } = req.params;
        const { nombre, descripcion, precio } = req.body;
        const imagenUrl = req.file ? '/uploads/' + req.file.filename : '/uploads/defaultBurger.jpg';

        const hamburguesa = await Hamburguesa.create({
            nombre,
            descripcion,
            precio,
            imagenUrl,
            idRestaurant
        });

        res.redirect('/admin/hamburguesa/' + idRestaurant);
    } catch (error) {
        console.error('Error al crear hamburguesa:', error);
        res.status(500).send('Error al crear hamburguesa');
    }
}

exports.deleteHamburguesa = async (req, res) => {
    try {
        const { idHamburguesa } = req.params;
        const { idRestaurant } = req.params;

        const hamburguesa = await Hamburguesa.findOne({ where: { id: idHamburguesa } });
        if (!hamburguesa) {
            return res.status(404).json({ message: 'Hamburguesa no encontrada' });
        }

        // Eliminar la hamburguesa de la base de datos
        await Calificacion.destroy({ where: { idHamburguesa } });
        const deletedHamburguesa = await Hamburguesa.destroy({ where: { id: idHamburguesa  } });

        if (deletedHamburguesa === 0) {
            return res.status(404).json({ message: 'Hamburguesa no encontrada' });
        }

        res.redirect('/admin/hamburguesa/' + idRestaurant);
        
    } catch (error) {
        console.error("Error al eliminar la hamburguesa: ", error);
        
    }
}

exports.getHamburguesaById = async (req, res) => {
    try {
        const { idHamburguesa } = req.params;
        const hamburguesa = await Hamburguesa.findOne({
            where: { id: idHamburguesa }
        });

        if (!hamburguesa) {
            return res.status(404).json({ message: 'Hamburguesa no encontrada' });
        }

        res.status(200).json(hamburguesa);
    } catch (error) {
        console.error('Error al obtener hamburguesa:', error);
        res.status(500).send('Error al obtener hamburguesa');
    }
}
    

exports.getHamburguesasAdminPage = async (req, res) => {
    try {
        const { idRestaurant } = req.params;
        const restaurant = await Restaurant.findOne({ where: { id: idRestaurant } });
        if (!restaurant) {
            return res.status(404).send('Restaurante no encontrado');
        }
        const hamburguesas = await Hamburguesa.findAll({ 
            where: { idRestaurant },
            include: [{
                model: Calificacion,
                attributes: ['rate']
            }]
        });
        if (hamburguesas.length === 0) {
            return res.render('pages/hamburguesaAdminPage', { restaurant, hamburguesas: [] })
        }

        // Calcular el promedio de calificaciones para cada hamburguesa
        hamburguesas.forEach(hamburguesa => {
            const calificaciones = hamburguesa.Calificacions.map(c => c.rate);
            hamburguesa.dataValues.promedioCalificacion = calificaciones.length
                ? (calificaciones.reduce((a, b) => a + b, 0) / calificaciones.length).toFixed(2)
                : 0;
        });
        
        
        res.render('pages/hamburguesaAdminPage', { restaurant, hamburguesas });
    } catch (error) {
        console.error('Error al obtener la pagina del formulario de hamburguesa:', error);
        res.status(500).send('Error al obtener la pagina del formulario de hamburguesa');
    }
}

exports.getHamburguesasFormPage = async(req, res)=>{
    try{
        const {idRestaurant, id} = req.params;
        if(idRestaurant && id) {
            const hamburguesa = await Hamburguesa.findOne({where:{id}});
            res.render('pages/hamburguesaFormPage', {hamburguesa, idRestaurant})

        }else if(idRestaurant){
            res.render('pages/hamburguesaFormPage', {hamburguesa: null, idRestaurant})
        }else{
            res.status(404).send("Restaurant no encontrado");
        }
    }
    catch(err){
        console.error("Error al obtener restaurantes: ",err);
    }
} 

exports.updateHamburguesa = async(req,res)=>{
    try {
        const { id, idRestaurant } = req.params;
        const { nombre, descripcion, precio } = req.body;
        const imagenUrl = req.file ? '/uploads/' + req.file.filename : '/uploads/defaultBurger.jpg';

        // Actualizar el restaurante en la base de datos
        const updatedHamburguesa = await Hamburguesa.update(
            { nombre, imagenUrl, descripcion, precio, idRestaurant },
            { where: { id } }
        );

        if (updatedHamburguesa[0] === 0) {
            return res.status(404).json({ message: 'Hamburguesa no encontrada' });
        }

        res.redirect('/admin/hamburguesa/'+idRestaurant);
        
    } catch (error) {
        console.error("Error al actualizar el restaurante: ", error);
        
    }

    /*  
        nombre,
        descripcion,
        precio,
        imagenUrl,
        idRestaurant
    */ 
}

exports.getAllHamburguesas = async (req, res) => {
    try {
        const hamburguesas = await Hamburguesa.findAll({raw:true});
        res.status(200).json(hamburguesas);
    } catch (error) {
        console.error('Error al obtener hamburguesas:', error);
        res.status(500).send('Error al obtener hamburguesas');
    }
}

exports.getSingleHamburguesaPage = async (req, res) => {
    const {idRestaurant, idHamburguesa} = req.params;
    try {
        const hamburguesa = await Hamburguesa.findOne({ where: { id: idHamburguesa } });
        if (!hamburguesa) {
            return res.status(404).send('Hamburguesa no encontrada');
        }
        res.render('pages/singleHamburguesa', { hamburguesa });
    } catch (error) {
        console.error('Error al obtener la hamburguesa:', error);
        res.status(500).send('Error al obtener la hamburguesa');
    }
}

            