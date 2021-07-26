var express = require('express');
var noteController = require('../controllers/note');
var router = express.Router();

router.post('/saveNote',noteController.save);
router.get('/listNotes/:gameID',noteController.list);
router.get("/message",noteController.message);


module.exports = router;