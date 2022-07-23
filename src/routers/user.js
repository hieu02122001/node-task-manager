const express = require('express');
const User = require('../models/user')
const auth = require('../middleware/auth');
const router = new express.Router();

// # Add user
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    // check duplicate email
    const email = await User.findOne({ email: user.email });
    if(email) {
        return res.status(400).send({ error: 'This email has already been used'});
    }
    // Generate auth token
    const token = await user.generateAuthToken();

    // #Code without async/await
    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((error) => {
    //     res.status(400).send(error);
    // })

    // #Code with async/await
    try {
        await user.save();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
})

// # Login
router.post('/users/login', async (req, res) => {
    try {
        const _email = req.body.email;
        const _password = req.body.password;
        const user = await User.findByCredentials(_email, _password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch(error) {
        res.status(400).send(error);
    }
})

// # Read all users
// router.get('/users', auth, async (req, res) => {
//     // User.find({}).then((users) => {
//     //     res.send(users)
//     // }).catch((error) => {
//     //     res.status(500).send(error)
//     // })

//     try {
//         const users = await User.find({});
//         res.send(users);
//     } catch (error) {
//         res.status(500).send(error);
//     } 
// })

// # Logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        // Remove the token on device we want to log out
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();

        res.send({ message: 'Logout successfully!'});
    } catch (error) {
        res.status(500).send(error);
    }
})

// # Logout all
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send({ message: 'Logout of all session successfully!'})
    } catch(error) {
        res.status(500).send(error);
    }
})

// # Read user's profile
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// # Update/Modify your own profile
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body); //=> return an array of keys like { 'name', 'age', 'password' }
    
    // Only obj have all of keys allowed could update
    const allowedUpdates = ['name', 'age', 'password', 'email'];
    // Check the updates[]
    // every() return true if all objs in the array true
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    })
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }
    
    try {
        const user = req.user;

        updates.forEach((update) => {
            user[update] = req.body[update];
        })

        await user.save();
        // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        res.send(user);
    } catch (error) {
        res.status(400).send(error);      
    }
})

// # DELETE user
router.delete('/users/me', auth, async (req, res) => {
    // const _id = req.user._id;
    try {
        // const user = await User.findByIdAndDelete(_id);
        
        // if (!user) {
        //     return res.status(404).send();
        // }
        
        await req.user.remove();
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;