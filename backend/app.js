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


app.use('/', router);

// app.use(express.static(path.join(__dirname, '../frontend')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
//   })

app.listen(port, () => {
    console.log('App rodando na porta', port)
});

