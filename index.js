const express = require('express');
const app = express();
const db = require('./db');
const Person = require('./models/Person');
require('dotenv').config();
const passport = require('./auth.js');



const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//middleware function

const logger = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] -Request made to ${req.originalUrl}`);
    next();
};



app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

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