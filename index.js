const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//middleware function

const logger = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] -Request made to ${req.originalUrl}`);
    next();
};

app.use(new localStrategy((username, password, done) => {
    // Here you would typically query your database to find the user and verify the password
    try{

    }catch(err){
        return done(err);
    }
}));


app.get('/', (req, res) => {
    res.send('Hello World this is my first node js app');
});



app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});

const personRoutes = require('./routes/personRoute');
const menuRoutes = require('./routes/menuRoute');
app.use(logger);
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);