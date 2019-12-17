var express = require('express'),
    http = require('http'),
    https = require('https'),
    path = require('path'),
    httpApp = express(),
    app = express(),
    fs = require('fs');


var httpsOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
};
httpApp.set('port', process.env.PORT || 80);
httpApp.get("*", function (req, res, next) {
    res.redirect("https://" + req.headers.host + "/" + req.path);
});

// all environments
app.set('port', process.env.PORT || 443);
app.enable('trust proxy');
app.use(express.static(path.join(__dirname, 'dist')));


http.createServer(httpApp).listen(httpApp.get('port'), function() {
    console.log('Express HTTP server listening on port ' + httpApp.get('port'));
});

https.createServer(httpsOptions, app).listen(app.get('port'), function() {
    console.log('Express HTTPS server listening on port ' + app.get('port'));
});