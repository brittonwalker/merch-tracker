module.exports = function(router, app) {

  var Merch = require('../models/merch');
  var Show = require('../models/show');

  router.route('/show')
      .post(function(req, res) {
          var show = new Show();
          show.date = req.body.date;
          show.venue = req.body.venue;
          show.address = req.body.address;
          show.contact = req.body.contact;
          show.pay = req.body.pay;
          show.city = req.body.city;
          show.coords = req.body.coords;
          show.coords = {};
          show.coords.lat = req.body.lat;
          show.coords.lng = req.body.lng;
          show.merch = req.body.merch;
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
              show.merch = req.body.merch;

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
  app.get('/shows/:show_id', function(req, res) {
      // Show.findById(req.params.show_id, function(err, show) {
      //     if (err)
      //         res.send(err);
      //     res.render('show-single-page', {
      //         show: show
      //     });
      // });
      Merch.find(function(err, merch) {
          if (err) {
              res.send(err);
          }
          Show.findById(req.params.show_id, function(err, show) {
              if (err)
                  res.send(err);
              res.render('show-single-page', {
                  show: show,
                  merch: merch
              });
          });
      })
  })

}
