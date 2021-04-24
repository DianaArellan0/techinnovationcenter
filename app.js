const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')
const morgan = require('morgan');
const engine = require('ejs-mate');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const jwt = require('jsonwebtoken');
//require('ejs-lint');

//var db;

require('dotenv').config();

//Base de Datos
mongoose.connect(process.env.BD_URL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, database) {
    if (err) return console.log(err)
    var db = database;
});
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Conectado a BD'));

//Initializations
require('./passport/local-auth');

//Import Routes
const itemsRoutes = require('./routes/items');
const imgRoutes = require('./routes/img');
const paymentsIntentRoutes = require('./routes/paymentsintent');
const { patch } = require('./routes/items');

//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.user = req.user;
    next();
});

app.use('/items', itemsRoutes);
app.use('/img', imgRoutes);
app.use('/create-payment-intent', paymentsIntentRoutes);

//Settings
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//CSS
app.use(express.static('assets'));

//ROUTES
app.use('/', require('./routes/index'));


app.get("/sensores", function(req, res) {
    db.collection('sensor1').find(function(err, result) {
        if (err) return console.log(err)
        res.render('sensores', { "fecha_reg": result });
    });
});


//Start
app.listen(3000);