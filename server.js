
var express = require('express'),
	app = express();

var cfg = {
	maxage: '2h'
};

app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});


app.use('/', express.static('dist', cfg));


app.listen(process.env.PORT || 80);