var express = require('express');
var router = express.Router();
var pg = require('pg');

var pool = new pg.Pool({
    database: 'test',
    user: 'snowman',
    password: 'snowman',
    host: 'localhost',
    port: 5432,
});

// ↓GET  http://localhost:3000/api/v1/user/:~~~~?***=###

router.get('/pass', function (req, res) {

    var SQL = `SELECT password FROM userkanrihyo WHERE userid=\'${req.query.id}\'`;

    pool.connect(function (err, client) {
        if (err) {
            console.log(err);
        } else {
            client.query(SQL, function (err, result) {
                res.send(result.rows[0].password);
            });
        }
    });

});

router.get('/id', function (req, res) {

    var SQL = `SELECT userid FROM userkanrihyo WHERE password=\'${req.query.pass}\'`;

    pool.connect(function (err, client) {
        if (err) {
            console.log(err);
        } else {
            client.query(SQL, function (err, result) {
                res.send(result.rows[0].userid);
            });
        }
    });
});

router.get('/login', function (req, res) {

    var SQL = `SELECT password FROM userkanrihyo WHERE userid=\'${req.query.id}\'`;

    pool.connect(function (err, client) {
        if (err) {
            console.log(err);
        } else {
            client.query(SQL, function (err, result) {
                if (result == null) {
                    res.send(false);
                } else if (result.rows[0].password == req.query.pass) {
                    res.send(true);
                } else {
                    res.send(false);
                }
            });
        }
    });
});




//routerをモジュールとして扱う準備
module.exports = router;