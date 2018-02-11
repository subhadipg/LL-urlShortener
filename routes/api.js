var express = require('express');
var router = express.Router();
var urldbModel = require('../dbModels/url');

// http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
String.prototype.hashCode = function() {
    let hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

router.post('/getshortened', (req, res, next) => {
    let inputUrl = req.body.inputUrl;
    let shortenedUrl = inputUrl.hashCode();
    let newUrl = new urldbModel({
        url: inputUrl,
        shortened: shortenedUrl
    });

    newUrl.save((err, entry) =>{
        if (err)
        {
            res.send({msg: 'Failed to add Url entry'});
        }
        res.json("This is in the db now: " + entry);
    });
})

router.get('/geturl', function(req, res, next){
    // findOne instead of find() since the db can have duplicate url:shortened entries
    urldbModel.findOne({shortened : req.query.inputHash}, (err, entry) => {
        if (err || entry==null)
        {
            res.send({msg: 'Failed to get any Url ...' + req.body.inputHash});
        }
        res.json("This is found: " + entry);
    })
});

router.get('/getallurls', function(req, res, next){
    urldbModel.find((err, urls) => {
        if (err)
        {
            res.send({msg: 'Failed to get all Urls'})
        }
        res.json(urls);
    })
});

module.exports = router;