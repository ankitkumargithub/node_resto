const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const PORT = process.env.PORT || 3000;


const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello World this is my first node js app');
});



app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});

const personRoutes = require('./routes/personRoute');
const menuRoutes = require('./routes/menuRoute');

app.use('/person', personRoutes);
app.use('/menu', menuRoutes);