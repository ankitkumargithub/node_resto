const mongose = require('mongoose');

const personSchema = new mongose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['Chef', 'Waiter', 'Manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
    },
    salary:{
        type: Number,
        required: true
    },
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
});

module.exports = mongose.model('Person', personSchema);