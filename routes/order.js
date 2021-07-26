var express = require('express');
var orderController = require('../controllers/order');
var router = express.Router();

router.post('/createOrder',orderController.save);
router.get('/listOrders/:userName',orderController.list);
router.get('/listAllOrders',orderController.listAll);
router.get('/listOrders/:userName',orderController.listOne);
router.put('/updateOrder/:id',orderController.update);
router.delete('/deleteOrder/:id',orderController.delete);



module.exports = router;