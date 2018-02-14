var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

// Database
mongoose.connect(process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/urlshortner');
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
app.use('/api', require('./routes/api'));
app.use('/', require('./routes/index'));

app.listen(process.env.PORT || 4000, () => console.log('Started listening!'))