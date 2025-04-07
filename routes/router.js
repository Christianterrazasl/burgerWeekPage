const express = require('express');
const router = express.Router();
const hamburguesaController = require('../controllers/hamburguesaController');
const restaurantController = require('../controllers/restaurantController');
const calificacionController = require('../controllers/calificacionController');
const upload = require('../config/upload');


//admin pages
router.get('/admin', restaurantController.getRestaurantAdminPage);
router.get('/admin/form', restaurantController.getRestaurantFormPage);
router.get('/admin/form/:id', restaurantController.getRestaurantFormPage);

router.get('/admin/hamburguesa/:idRestaurant', hamburguesaController.getHamburguesasAdminPage);
router.get('/admin/hamburguesa/form/:idRestaurant', hamburguesaController.getHamburguesasFormPage);
router.get('/admin/hamburguesa/form/:idRestaurant/:id', hamburguesaController.getHamburguesasFormPage);


//user pages
router.get('/main-page', restaurantController.getRestaurantsPage);
router.get('/restaurant-page/:idRestaurant', hamburguesaController.getHamburguesasPage);
router.get('/restaurant-page/:idRestaurant/:idHamburguesa', hamburguesaController.getSingleHamburguesaPage);

//endpoint restaurant
router.post('/api/restaurant', upload.single('logo'), restaurantController.postRestaurant);
router.post('/api/restaurant/:id/edit', upload.single('logo'),restaurantController.updateRestaurant);
router.post('/api/restaurant/:id/delete', restaurantController.deleteRestaurant);
router.get('/api/restaurant/:id', restaurantController.getRestaurantById);

//endpoint hamburguesa
router.post('/api/hamburguesa/:idRestaurant', upload.single('fotoHamburguesa'), hamburguesaController.postHamburguesa);
router.post('/api/hamburguesa/:idRestaurant/:id/edit', upload.single('fotoHamburguesa'), hamburguesaController.updateHamburguesa);
router.post('/api/hamburguesa/:idRestaurant/:idHamburguesa/delete', hamburguesaController.deleteHamburguesa);
router.get('/api/hamburguesa/:idRestaurant/:idHamburguesa', hamburguesaController.getHamburguesaById);
router.get('/api/hamburguesa/all', hamburguesaController.getAllHamburguesas);

//endpoint calificacion
router.get('/api/calificacion/:idHamburguesa', calificacionController.getCalificacionByBurgerId);
router.post('/api/calificacion/:idHamburguesa', calificacionController.postCalificacion);

module.exports = router;