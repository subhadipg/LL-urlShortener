var express = require('express');
var router = express.Router();

// http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
String.prototype.hashCode = function() {
    var hash = 0;
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

router.post('/getfullurl', function(req, res, next){
    var inputUrl = req.body.inputUrl;
    res.json(inputUrl.hashCode());
});

module.exports = router;