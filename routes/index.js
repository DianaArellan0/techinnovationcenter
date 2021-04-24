const express = require('express');
const { mongo } = require('mongoose');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/signup', (req, res, next) => {
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

router.get('/signin', (req, res, next) => {
    res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

router.get('/productos', (req, res, next) => {
    res.render('productos');
});

router.get('/contacto', (req, res, next) => {
    res.render('contacto');
});

router.get('/tienda', (req, res, next) => {
    res.render('indexCarrito');
});

router.get('/sensores', (req, res, next) => {
    res.render('sensores');
});

router.post('/contacto', (req, res, next) => {
    res.render('contacto');
});

router.get('/forgot', (req, res, next) => {
    res.render('forgot');
});

router.get("/sensores", function(req, res) {
    db.collection('sensor1').find().toArray(function(err, result) {
        if (err) return console.log(err)
        res.render('sensores', { fecha_reg: result });
    });
});

router.get("/sensores", function(req, res) {
    db.collection('sensor2').find().toArray(function(err, result) {
        if (err) return console.log(err)
        res.render('sensores', { fecha_reg2: result });
    });
});
//router.get("/sensores", function(req, res) {
//    database.collection('sensor1').find().toArray(function(err, result) {
//        if (err) return console.log(err), res.render('sensores', { sensor1: result });
//    });
//});



function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

module.exports = router;