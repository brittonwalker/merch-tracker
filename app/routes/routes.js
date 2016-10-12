var Merch = require('../models/merch');
var Show = require('../models/show');
var Expense = require('../models/expense');

module.exports = function(router, app) {
    router.use(function(req, res, next) {
        console.log('Something is happening.');
        next();
    })

    router.get('/', function(req, res) {
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    router.route('/show')
        .post(function(req, res) {
            var show = new Show();
            show.date = req.body.date;
            show.venue = req.body.venue;
            show.contact = req.body.contact;
            show.pay = req.body.pay;
            show.city = req.body.city;
            show.lat = req.body.lat;
            show.lang = req.body.lang;
            show.merch = [];

            show.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({
                    message: 'Created a new show!'
                });
            });
        })
        .get(function(req, res) {
            Show.find(function(err, show) {
                if (err) {
                    res.send(err);
                }
                res.json(show);
            })
        })

    router.route('/show/:show_id')
        .get(function(req, res) {
            Show.findById(req.params.show_id, function(err, show) {
                if (err)
                    res.send(err);
                res.json(show);
            });
        })
        .put(function(req, res) {
            Show.findById(req.params.show_id, function(err, show) {
                if (err) {
                    res.send(err)
                }
                show.date = req.body.date;
                show.venue = req.body.venue;
                show.contact = req.body.contact;
                show.pay = req.body.pay;
                show.city = req.body.city;
                show.lat = req.body.lat;
                show.lang = req.body.lang;

                show.save(function(err) {
                    if (err) {
                        res.send(err);
                    }
                    res.json({
                        message: 'Show item updated!'
                    });
                })
            })
        })
        .delete(function(req, res) {
            Show.remove({
                _id: req.params.show_id
            }, function(err, show) {
                if (err) {
                    res.send(err);
                }
                res.json({
                    message: 'You deleted a merch item, I hope you meant to do that.'
                });
            });
        });

    router.route('/merch')
        .post(function(req, res) {
            var merch = new Merch();
            merch.name = req.body.name;
            merch.quantity = req.body.quantity;
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
    router.route('/expense')
        .post(function(req, res) {
            var expense = new Expense();
            expense.description = req.body.description;
            expense.amount = req.body.amount;

            expense.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({
                    message: 'Created a new expense!'
                });
            });
        })
        .get(function(req, res) {
            Expense.find(function(err, expense) {
                if (err) {
                    res.send(err);
                }
                res.json(expense);
            })
        });

    app.get('/', function(req, res) {
        res.render('home');
    })
    app.get('/shows', function(req, res) {
        Show.find(function(err, show) {
            if (err) {
                res.send(err);
            }
            res.render('shows', {
                show: show
            });
        })
    })
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
    app.get('/shows/:show_id', function(req, res) {
        Show.findById(req.params.show_id, function(err, show) {
            if (err)
                res.send(err);
            res.render('show-single-page', {
                show: show
            });
        });
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
    app.get('/expenses', function(req, res) {
        Expense.find(function(err, expense) {
            if (err) {
                res.send(err);
            }
            res.render('expenses', {
                expense: expense
            });
        })
    })
}
