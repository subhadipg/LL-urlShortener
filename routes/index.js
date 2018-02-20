var express = require('express');
var router = express.Router();
const UrlModel = require('../dbModels/url');

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/:shortUrl', function(req, res, next){
    var shortUrl = req.params.shortUrl;
    UrlModel.findByShortUrl(shortUrl, (err, existingEntry) => {
        if (err || !existingEntry) {
            res.send({ msg: `Failed to find a mapping for "${shortUrl}"` });
            return;
        }

        res.redirect("http://" + existingEntry.url);
    })
});

module.exports = router;