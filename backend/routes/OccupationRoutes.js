const express = require('express');
const router = express.Router();

//Controllers
const {insertOccupation, getAllOccupations} = require('../controllers/OccupationController');

//Middlewares
const authGuard = require('../middlewares/authGuard');
const validate = require('../middlewares/handleValidation');

//Routes
router.post('/', authGuard, insertOccupation);
router.get('/', authGuard, getAllOccupations);

module.exports = router;