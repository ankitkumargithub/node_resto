const express = require('express');

const router = express.Router();
const Person = require('./../models/Person');


router.post('/', async(req, res) => {
    try{
    const data = req.body;
    const person = new Person(data);

    const response = await person.save();
    console.log('Person saved successfully:', response);
    res.status(201).json(response);

    }catch(error){
        console.log('Error saving person:', error);
        res.status(500).json({ error: 'Error saving person', details: error });
        
    }
});

router.get('/', async(req, res) => {
    try {
        const persons = await Person.find();
        res.json(persons);
    } catch (error) {
        console.error('Error fetching persons:', error);
        res.status(500).json({ error: 'Error fetching persons'});
    }
});

router.get('/:workType', async(req, res) =>{
    try {
        const workType = req.params.workType;
        if (!['Chef', 'Waiter', 'Manager'].includes(workType)) {
            return res.status(404).json({ error: 'Invalid work type. Must be Chef, Waiter, or Manager.' });
        }else{
            const persons = await Person.find({ work: workType });
            res.json(persons);
        }
    } catch (error) {
        console.log('Error fetching persons by work type:', error);
        res.status(500).json({ error: 'Error fetching persons by work type' });
    }
});

router.put("/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const person = await Person.findByIdAndUpdate(id, data,
             { 
                new: true, // Return the updated document
                runValidators: true // Ensure validation rules are applied
             });
        if(!person){
            return res.status(404).json({ error: 'Person not updated.' }); 
        }     
        console.log('Person updated successfully:', person);     
        res.status(200).json(person);

    } catch (error) {
        console.log('Error updating person:', error);
        res.status(500).json({ error: 'Error updating person', details: error });
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const person = await Person.findByIdAndDelete(id);
        if(!person){
            return res.status(404).json({ error: 'Person not found.' }); 
        }     
        console.log('Person deleted successfully:', person);     
        res.status(200).json({ message: 'Person deleted successfully' });

    } catch (error) {
        console.log('Error deleting person:', error);
        res.status(500).json({ error: 'Error deleting person', details: error });
    }
});

//old method

// app.post('/person', (req, res) => {
//     const data = req.body;
//     const person = new Person(data);
      
//     person.save(error, result => {
//         if (error) {
//             console.error('Error saving person:', error);
//             res.status(500).json({ error: 'Error saving person', details: error });
//         } else {
//             res.status(201).json(result);
//         }
//     });  
// });

module.exports = router;