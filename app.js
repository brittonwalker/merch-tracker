var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


mongoose.connect('mongodb://brittonwalker:skateitup7@ds049486.mlab.com:49486/merch-tracker');
var Merch = require('./app/models/merch');
var Show = require('./app/models/show');
var Expense = require('./app/models/expense');

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

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.get('/', function(req, res) {
    res.render('home');
})
app.get('/shows', function(req, res) {
  Show.find(function(err, show) {
      if (err) {
          res.send(err);
      }
      res.render('shows', {show: show});
  })
})
app.get('/merch', function(req, res) {
  Merch.find(function(err, merch) {
      if (err) {
          res.send(err);
      }
      res.render('merch', {merch: merch});
  })
})
app.get('/shows/:show_id', function(req, res) {
    Show.findById(req.params.show_id, function(err, show) {
        if (err)
            res.send(err);
        res.render('show-single-page', {show: show});
    });
})
app.get('/merch/:merch_id', function(req, res) {
    Merch.findById(req.params.merch_id, function(err, merch) {
        if (err)
            res.send(err);
        res.render('merch-single-page', {merch: merch});
    });
})
app.get('/expenses', function(req, res) {
    Expense.find(function(err, expense) {
        if (err) {
            res.send(err);
        }
        res.render('expenses', {expense: expense});
    })
})

// app.use(express.static('dist/'));
app.use(express.static(__dirname + '/dist/'));

var port = process.env.PORT || 8080;

app.use('/api', router);

app.listen(port);
console.log('Being served to you on port ' + port);
