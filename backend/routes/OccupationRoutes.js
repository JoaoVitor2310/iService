const express = require('express');
const router = express.Router();

//Controllers
const {insertOccupation} = require('../controllers/OccupationController');

//Middlewares
const authGuard = require('../middlewares/authGuard');
const validate = require('../middlewares/handleValidation');

//Routes
router.post('/', authGuard, validate, insertOccupation);

module.exports = router;