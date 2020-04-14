'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.set('view engine', 'ejs');

app.use(express.static('./public'))
// app.use(express.urlencoded({extended:true}));


//Get Index
app.get('/', (request, response) => {
    response.render('pages/index');
});

//Get newPage
app.get('/searches/new',(request,response)=>{
response.render('pages/searches/new');
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
