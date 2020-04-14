'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.set('view engine', 'ejs');

app.use(express.static('./public'))
// app.use(express.urlencoded({extended:true}));



app.get('/', (request, response) => {
    response.render('pages/index');
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
