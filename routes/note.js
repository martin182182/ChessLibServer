var express = require('express');
var noteController = require('../controllers/note');
var router = express.Router();

router.post('/saveNote',noteController.save);
router.get('/listNotes/:gameID',noteController.list);


module.exports = router;