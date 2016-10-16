module.exports = function(router, app) {

    var Merch = require('../models/merch');

    router.route('/merch')
        .post(function(req, res) {
            var merch = new Merch();
            merch.name = req.body.name;
            merch.quantity = req.body.quantity;
            merch.type = req.body.type;
            merch.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({
                    message: 'Created a new merch!'
                })
            })
        })
        .get(function(req, res) {
            Merch.find(function(err, merch) {
                if (err) {
                    res.send(err + 'what the fuck');
                }
                res.json(merch);
            })
        })

    router.route('/merch/:merch_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
            Merch.findById(req.params.merch_id, function(err, merch) {
                if (err)
                    res.send(err);
                res.json(merch);
            });
        })
        .put(function(req, res) {
            Merch.findById(req.params.merch_id, function(err, merch) {
                if (err) {
                    res.send(err)
                }
                merch.name = req.body.name;
                merch.quantity = req.body.quantity;
                merch.type = req.body.type;
                merch.sizes = req.body.sizes;
                merch.save(function(err) {
                    if (err) {
                        res.send(err);
                    }
                    res.json({
                        message: 'Merch item updated!'
                    });
                })
            })
        })
        .delete(function(req, res) {
            Merch.remove({
                _id: req.params.merch_id
            }, function(err, merch) {
                if (err) {
                    res.send(err);
                }
                res.json({
                    message: 'You deleted a merch item, I hope you meant to do that.'
                });
            });
        });

    app.get('/merch', function(req, res) {
        Merch.find(function(err, merch) {
            if (err) {
                res.send(err);
            }
            res.render('merch', {
                merch: merch
            });
        })
    })
    app.get('/merch/:merch_id', function(req, res) {
        Merch.findById(req.params.merch_id, function(err, merch) {
            if (err)
                res.send(err);
            res.render('merch-single-page', {
                merch: merch
            });
        });
    })
}
