const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config()

const router = require('./routes/Router');
require('./config/db.js')

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/', router);

app.listen(port, () => {
    console.log('App rodando na porta', port)
});