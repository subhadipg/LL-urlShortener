var mongoose = require('mongoose');

const UrlSchema = mongoose.Schema({
    url : {
        type: String,
        required: true
    }
});

var UrlModel = mongoose.model('url', UrlSchema);

UrlModel.findByShortUrl = function (shortUrl, callback) {
    var id = Buffer.from(shortUrl, "base64").toString('hex');
    this.findById(id, callback);
}

UrlModel.findByUrl = function (url, callback) {
    this.findOne({ url }, callback);
}

Object.defineProperty(UrlModel.prototype, "shortUrl", {
    get: function() {
        return Buffer.from(this.id, "hex").toString('base64');
    }
});

module.exports = UrlModel;