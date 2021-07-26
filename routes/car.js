var express = require('express');
var carController = require('../controllers/car');
var router = express.Router();

router.post('/saveCar',carController.save);
router.get('/listCars/:clientId',carController.list);
router.get('/listAll',carController.listAll);
router.put('/editCar/:serial',carController.edit);
router.delete('/deleteCar/:serial',carController.delete);


module.exports = router;
