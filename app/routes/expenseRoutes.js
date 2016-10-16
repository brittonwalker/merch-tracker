module.exports = function(router, app) {

    var Expense = require('../models/expense');

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
