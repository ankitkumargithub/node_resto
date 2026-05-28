const mongoos = require('mongoose');

const mongoUrl = 'mongodb://localhost:27017/resto';

// mongoos.connect(mongoUrl,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
mongoos.connect(mongoUrl);

const db = mongoos.connection;

db.on('connected',()=>{
    console.log('MongoDB connected successfully');
});

db.on('error',()=>{
    console.log('MongoDB connection failed');
});

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
});

module.exports = db;