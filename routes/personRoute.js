const express = require('express');

const router = express.Router();
const Person = require('./../models/Person');

const {jwtMiddleware, generateToken} = require('./../jwt.js');


router.post('/signup', async(req, res) => {
    try{
    const data = req.body;
    const person = new Person(data);

    const response = await person.save();
    console.log('Person saved successfully:', response);

    const payload = {
        id: response.id,
        username: response.username,
    }
    const token = generateToken(payload);

    res.status(201).json({response: response, token: token});

    }catch(error){
        console.log('Error saving person:', error);
        res.status(500).json({ error: 'Error saving person', details: error });
        
    }
});

//login route

router.post('/login', async(req, res) => {
    try{
        const {username, password} = req.body;
        const person = await Person.findOne({ username: username });

        if(!person || !await person.comparePassword(password)){
            return res.status(401).json({ message: 'Invalid username or password'});
        }

        // Generate JWT token

        const payload = {
            id: person.id,
            username: person.username,
        }
        const token = generateToken(payload);

        res.status(200).json({ message: 'Login successful', token: token});
    }
    catch(error){
        console.log('Error during login:', error);
        res.status(500).json({ error: 'Error during login', details: error });
    }
});

//profile route
router.get('/profile', jwtMiddleware, async(req, res) => {
    try{
        const userData = req.user;
        console.log('User data from token:', userData);
        const person = await Person.findById(userData.id);
        if (!person) {
            return res.status(404).json({ error: 'Person not found' });
        }
        res.json(person);   
    } catch (error) {
        console.log('Error fetching profile:', error);
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Error fetching profile', details: error });
    }
});

router.get('/', jwtMiddleware, async(req, res) => {
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