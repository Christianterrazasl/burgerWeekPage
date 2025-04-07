const {Hamburguesa, Calificacion} = require('../models');

exports.getCalificacionByBurgerId = async (req, res) => {
    try {
        const { idHamburguesa } = req.params;
        const calificaciones = await Calificacion.findAll({
            where: { idHamburguesa }
        });
        res.status(200).json(calificaciones);
    } catch (error) {
        console.error('Error al obtener calificaciones:', error);
        res.status(500).send('Error al obtener calificaciones');
    }
}

exports.postCalificacion = async (req, res) => {
    try {
        const { idHamburguesa } = req.params;
        const { rate } = req.body;

        // Crear la calificación
        const newCalificacion = await Calificacion.create({
            rate,
            idHamburguesa
        });

        res.redirect('/pages/successfulReview');
    } catch (error) {
        console.error('Error al crear calificación:', error);
        res.status(500).send('Error al crear calificación');
    }
}