// Dependencies
const path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
    app.get("/api/start-chomp", function (req, res) {
        console.log(db.burgers)
        try {
            db.burgers.findAll({
                order: [
                    ['burger_name', 'ASC']]
            }).then(function (data) {
                let burgers = [];
                let devBurgers = [];
                data.forEach(function (currentValue) {
                    if (currentValue.devoured) {
                        devBurgers.push(currentValue);
                    } else {
                        burgers.push(currentValue);
                    }
                });
                var hbsObject = {
                    burger: burgers,
                    devoured: devBurgers
                };
                res.render("burgers", hbsObject);
            });
        } catch (err) {
            console.log(err);
            res.status(500).end();
        }
    });

    app.post("/api/burger", function (req, res) {
        let newBurger = req.body
        db.burgers.create({
            burger_name: newBurger.burger_name,
            devoured: false
        }).then(function (result) {
            res.json({ id: result.insertId });
        });

        res.status(204).end();
    });

    app.put("/api/burger/:id", function (req, res) {
        db.burgers.update(
            { devoured: true },
            { returning: true, where: { id: req.params.id } }
        ).then(function (result) {
            return res.json(result);
        });
    });

    app.delete("/api/burger/:id", function (req, res) {
        db.burgers.destroy({
            where: { id: req.params.id }
        }
        ).then(function (result) {
            return res.json(result);
        });
    });

    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "../app/public/index.html"));
    });
};