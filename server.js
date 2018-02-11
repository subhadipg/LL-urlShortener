var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

// Databse
mongoose.connect('mongodb://localhost:27017/urlshortner');
mongoose.connection.on('connected', ()=> {
    console.log('Connected to mongodb @27017');
})
mongoose.connection.on('error', (err)=> {
    if (err)
    {
    console.log('Error connecting to mongodb: ' + err);
    }
})

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Routing logic
var index = require('./routes/index');
app.use('/', index);
var api = require('./routes/api');
app.use('/api', api);


app.listen(process.env.PORT || 4000, () => console.log('Started listening!'))