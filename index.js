const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/router');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
const PORT = 3000;
app.set('view engine', 'ejs');
app.use('/', router);

app.listen(PORT, ()=> console.log("App listening on port "+ PORT));

