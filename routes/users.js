var express = require('express');
var router = express.Router();
var db = require('../settings/db');

router.get('/authorize', (req, res) => {
  var params = [
    req.query.login,
    req.query.password
  ];
  db.any("SELECT id FROM users WHERE login = $1 AND password = $2", params)
  .then(data => {
    if (data && data.length > 0)
      res.send(data[0]);
    else
      res.send({id:0});
  })
  .catch(err => {
    console.log(err);
    res.send("Error");
  });
});

router.get('/select', (req, res) => {
  db.any("SELECT * FROM users")
  .then(data => {
      res.send(data);
  })
  .catch(err => {
    console.log(err);
    res.send("Error");
  });
});

router.get('/delete', (req, res) => {
  db.none("DELETE FROM users WHERE id = $1", req.query.id)
  .then(() => {
    res.send("OK");
  })
  .catch(err => {
    console.log(err);
    res.send("Error");
  });
});

router.get('/update', (req, res) => {
  var params = [
    req.query.login,
    req.query.password,
    req.query.age,
    req.query.id
  ];
  db.none("UPDATE users SET login = $1, password = $2, age = $3 WHERE id = $4", params)
  .then(() => {
    res.send("OK");
  })
  .catch(err => {
    console.log(err);
    res.send("Error");
  });
});

router.get('/insert', (req, res) => {
  var params = [
    req.query.login,
    req.query.password,
    req.query.age
  ];
  db.none("INSERT INTO users (login, password, age) VALUES ($1, $2, $3)", params)
  .then(() => {
    res.send("OK");
  })
  .catch(err => {
    console.log(err);
    res.send("Error");
  });
});

module.exports = router;
