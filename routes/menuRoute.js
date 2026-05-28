const express = require('express');
const router = express.Router();
const MenuItem = require('../models/Menu');

router.post('/', async(req, res) => {
    try{
        const data =  req.body;
        const menuItem = new MenuItem(data);
        const response = await menuItem.save();
        console.log('Menu item saved successfully:', response);
        res.status(201).json(response);
    }
    catch(error){
        console.error('Error saving menu item:', error);
        res.status(500).json({ error: 'Error saving menu item', details: error });
    }
});

router.get('/', async(req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Error fetching menu items'});
    }
});

router.get('/:taste', async(req, res) => {
    try{
        const taste = req.params.taste;
        if(!['Spicy', 'Sweet', 'Sour', 'Bitter', 'Salty'].includes(taste)){
            return res.status(404).json({ error: 'Invalid taste. Must be Spicy, Sweet, Sour, Bitter, or Salty.' });
        }
        const menuItem = await MenuItem.find({ taste: taste });
        if(menuItem.length === 0){
            return res.status(404).json({ error: 'No menu items found with the specified taste.' });
        }
        res.json(menuItem);
    }
    catch(error){
        console.error('Error fetching menu items by taste:', error);
        res.status(500).json({ error: 'Error fetching menu items by taste' });
    }
});


module.exports = router;