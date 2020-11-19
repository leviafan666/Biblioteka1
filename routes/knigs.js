var express = require('express');
var router = express.Router();
var db = require('../settings/db');

router.get('/', (req, res) => {
    db.any('SELECT * FROM "knigs"')
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err);
    });
});

module.exports = router;
