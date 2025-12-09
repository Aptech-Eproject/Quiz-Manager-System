const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.get('/', resultController.getAllResults);
router.get('/:id', resultController.getResultById);
router.post('/', resultController.submitResult);

module.exports = router;
