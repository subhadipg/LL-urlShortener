const express = require('express');
const router = express.Router();
const UrlModel = require('../dbModels/url');

router.post('/url', (req, res, next) => {
    let url = req.body.url;
    UrlModel.findByUrl(url, (err, existingEntry) => {
        if (existingEntry) {
            console.log(existingEntry, existingEntry.id, existingEntry.shortUrl)
            res.send(`"${url}" already maps to "${existingEntry.shortUrl}"`);
            return;
        }

        let newUrl = new UrlModel({ url });
        newUrl.save((err, newEntry) => {
            if (err) {
                res.err(err);
                return;
            }
            
        res.send(`"${newEntry.url}" now maps to "${newEntry.shortUrl}"`);
        });
    });
})

router.get('/url', function(req, res, next){
    var shortUrl = req.query.shortUrl;
    UrlModel.findByShortUrl(shortUrl, (err, existingEntry) => {
        if (err || !existingEntry) {
            res.send({ msg: `Failed to find a mapping for "${shortUrl}"` });
            return;
        }

        res.send(`"${shortUrl}" maps to "${existingEntry.url}"`);
    })
});

module.exports = router;