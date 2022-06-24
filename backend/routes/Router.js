const express = require('express');
const router = express();

router.get('/', (req,res) => {
    res.send('Essa é a API!');
})

router.use('/api/users', require('./UserRoutes'));
router.use('/api/photos', require('./PhotoRoutes'));
router.use('/api/occupations', require('./OccupationRoutes'));

module.exports = router;