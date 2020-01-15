var express = require("express");

var router = express.Router();

const path = require('path');

var burger = require("../models/burger.js");

router.get("/api/start-chomp", function(req, res) {
  burger.all(function(data) {
    let burgers = [];
    let devBurgers = [];
    data.forEach(function(currentValue){
      if(currentValue.devoured){
        devBurgers.push(currentValue);
      }else{
        burgers.push(currentValue);
      }
    });
    var burgerObject = {
      burger: burgers,
      devoured: devBurgers
    };
    console.log(burgerObject);
    res.render("burgers.handlebars", burgerObject);
  });
});

router.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.post("/api/burger", function(req, res) {
  burger.create([
    "name", "devoured"
  ], [
    req.body.name, req.body.devoured
  ], function(result) {
    res.json({ id: result.insertId });
  });
});

router.put("/api/burger/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burger/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("test");

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;