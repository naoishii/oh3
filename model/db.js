var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var DBs = {};

// DBあれこれ
module.exports = new Promise(function (resolve, reject) {
    var GPS;
    db.once('open', function (callback) {
        console.log('DDDDDDDDDDDDDDDBBBBBBBBBBBBBBBBBBBB');
        // GPS
        (function () {
            var gpsSchema = mongoose.Schema({
                lat: Number,
                latDirection: String,
                lon: Number,
                lonDirection: String,
                date: { type: Date, default: Date.now },
            });
            GPS = mongoose.model('GPS', gpsSchema);
            DBs.GPS = GPS;
        })();
        resolve(DBs);

    });
});
