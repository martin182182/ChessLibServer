var express = require('express');
var clientController = require('../controllers/client');
var router = express.Router();
var mp = require('connect-multiparty');
var md_upload = mp({uploadDir: './upload/clients'});

router.post('/saveClient',clientController.save);
router.get('/allClients',clientController.listClients);
router.get('/client/:userName',clientController.getClient);
router.put('/updateClient/:userName',clientController.update);
router.delete('/deleteClient/:userName',clientController.delete);
router.post('/upload-photo/:userName', md_upload ,clientController.upload);
router.get('/get-photo/:photo',clientController.getPhoto);
router.get('/search/:search',clientController.search);
router.post('/auth',clientController.auth);
router.post('/sendEmail',clientController.infoAYW);


module.exports = router;
