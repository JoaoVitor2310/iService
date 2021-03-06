const express = require('express');
const router = express.Router();

//Controllers
const {register, login, getCurrentUser, update, getUserById, getUsersByOccupation, searchUsers, followUser} = require('../controllers/UserController');

//Middlewares
const validate = require('../middlewares/handleValidation');
const { userCreateValidation, loginValidation, userUpdateValidation } = require('../middlewares/userValidation');
const authGuard = require('../middlewares/authGuard');
const { imageUpload } = require('../middlewares/imageUpload');


//Routes
router.post('/register', userCreateValidation(), validate, register);
router.post('/login', loginValidation(), validate, login);
router.get('/profile', authGuard, getCurrentUser);
router.put('/', authGuard, userUpdateValidation(), validate, imageUpload.single('profileImage'), update)
router.get('/search', authGuard, searchUsers);
router.get('/occupation', authGuard, getUsersByOccupation)
router.get('/:id', getUserById);
router.put('/follow/:id', authGuard, followUser);

module.exports = router;