const express = require('express');
const app = express();
const {resolve} = require('path');

app.use('/', express.static(resolve(__dirname, './src/App.js')));

app.listen(process.env.PORT || '3000', (err) => {
    if(err){
        return console.log(err)
    }else{
        return console.log('Tudo funcionando.')
    }
})
