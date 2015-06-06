var express = require('express');
var app = express()
var morgan = require('morgan');
var bodyParser = require('body-parser');
var multer  = require('multer');
var DB = require('./model/db.js');

DB.then(function (DB) {
    var blid = '';

    // body parser
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(multer()); // for parsing multipart/form-data

    // loger
    app.use(morgan());
    app.use(express.static(__dirname + '/public'));


    // router
    require('./router/gps.js')(app, DB);

    // basic
    app.get('/', function (req, res) {
      res.send('Hello World! this is my first apps')
    })

    app.get('/api', function (req, res) {
        res.type('json');
        res.send({
            blid: blid
        });
    })

    app.get('/clear', function (req, res) {
        res.type('json');
        blid = '';
        res.send('clear');
    })

    app.post('/api', function (req, res) {
        res.type('json');
        var p;
        var out = 'post \n';
        for (p in req.body) {
            out += p + ' : ' + req.body[p] + '\n';;
        }
        blid = req.body['blid'];
        res.send(out );
    })


    app.use(express.static(__dirname + '/static'));




    var server = app.listen(8080, function () {

      var host = server.address().address
      var port = server.address().port

      console.log('Example app listening at http://%s:%s', host, port)

    })
});
