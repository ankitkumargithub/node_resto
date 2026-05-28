const mongose = require('mongoose');

const menuSchema = new mongose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste:{
        type: String,
        enum: ['Spicy', 'Sweet', 'Sour', 'Bitter', 'Salty'],
        required: true
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    ingredients: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    }
});

module.exports = mongose.model('Menu', menuSchema);