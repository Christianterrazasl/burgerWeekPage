const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const PORT = 3000;
app.set('view engine', 'ejs');

const db = require('./models');
require('./controllers')(app,db); 

app.listen(PORT, ()=> console.log("App listening on port "+ PORT));

