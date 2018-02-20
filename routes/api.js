const express = require('express');
const router = express.Router();
const UrlModel = require('../dbModels/url');

router.post('/shorten', (req, res, next) => {
    let url = req.body.url;
    UrlModel.findByUrl(url, (err, existingEntry) => {
        if (existingEntry) {
            console.log(existingEntry, existingEntry.id, existingEntry.shortUrl)
            res.json({
                message: `"${url}" already maps to "${existingEntry.shortUrl}"`,
                url,
                shortUrl: existingEntry.shortUrl
            });
            return;
        }

        let newUrl = new UrlModel({ url });
        newUrl.save((err, newEntry) => {
            if (err) {
                res.json(err);
                return;
            }
            
            res.json({
                url,
                shortUrl: newEntry.shortUrl
            });
        });
    });
});

router.get('/all', function(req, res, next) {
    UrlModel.find((err, urls) => {
        if (err) {
            res.send({ msg: 'Failed to get all urls', err });
            return;
        }

        res.json(urls);
    })
});

module.exports = router;