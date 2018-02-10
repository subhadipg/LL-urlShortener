var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render('index')
});

app.post('/getfullurl', function(req, res)
{
    var inputUrl = req.body.inputUrl;

    res.json(inputUrl.substring(0,inputUrl.length/2));
});

app.use(express.static(path.resolve(__dirname, 'public')));

app.listen(process.env.PORT || 4000, () => console.log('Started listening!'))