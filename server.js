const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const https = require('https');
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8080;
  }

app.use(express.urlencoded({extended: false}));
/* app.listen(PORT,()=>{
    console.log('listening on port',PORT);
}); */
console.log(__dirname, path.join(__dirname,'dist'))
app.use(express.static(path.join(__dirname,'dist')));


/* http.get('*', function(req, res) {  
    res.redirect('https://' + req.headers.host + req.url);
}) */

https.createServer(app,(req,res)=>{

}).listen(port,()=> console.log("listening on port",port));
