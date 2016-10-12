var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var Merch = require('./app/models/merch');
var Show = require('./app/models/show');
var Expense = require('./app/models/expense');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to DB
mongoose.connect('mongodb://brittonwalker:skateitup7@ds049486.mlab.com:49486/merch-tracker' || 'http://localhost/merch');

// Set template language
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/dist/'));

app.use('/api', router);
require('./app/routes/routes.js')(router, app);

app.listen(port);
console.log('Being served to you on port ' + port);
