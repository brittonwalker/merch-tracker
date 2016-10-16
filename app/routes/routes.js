module.exports = function(router, app) {

    var Merch = require('../models/merch');
    require('./merchRoutes')(router, app);

    var Show = require('../models/show');
    require('./showRoutes')(router, app);

    var Expense = require('../models/expense');
    require('./expenseRoutes')(router, app);

    router.use(function(req, res, next) {
        console.log('Something is happening.');
        next();
    })

    router.get('/', function(req, res) {
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    app.get('/', function(req, res) {
        res.render('home');
    })

}
