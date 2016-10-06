var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
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
    .post(function(req, res){
      var show = new Show();
      show.date = req.body.date;
      show.venue = req.body.venue;
      show.contact = req.body.contact;
      show.pay = req.body.pay;
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
    .put(function(req, res){
        Merch.findById(req.params.merch_id, function(err, merch) {
          if (err){
            res.send(err)
          }
          merch.name = req.body.name;
          merch.quantity = req.body.quantity;

          merch.save(function(err){
            if (err) {
              res.send(err);
            }
            res.json({ message: 'Merch item updated!' });
          })
        })
    })
    .delete(function(req, res){
      Merch.remove({
        _id: req.params.merch_id
      }, function(err, merch){
        if (err){
          res.send(err);
        }
        res.json({ message: 'You deleted a merch item, I hope you meant to do that.' });
      });
    });

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.get('/', function(req, res){
  res.render('home');
})
app.get('/shows', function(req, res){
  res.render('shows');
})

app.use(express.static('dist/'));

var port = process.env.PORT || 8080;

app.use('/api', router);

app.listen(port);
console.log('Being served to you on port ' + port);
