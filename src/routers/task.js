const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')

// #Create new task
router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body);

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((error) => {
    //     res.status(400).send(error);
    // })
    try {
        await task.save();
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error);
    }
})

// #Read all tasks
router.get('/tasks', auth, async (req, res) => {
    // Task.find({}).then((tasks) => {
    //     res.status(201).send(tasks)
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })

    try {
        // const tasks = await Task.find({owner: req.user._id});
        await req.user.populate('tasks');
        res.status(201).send(req.user.tasks);
    } catch (error) {
        res.status(500).send(error);
    }
})
// #Read a task by its id
router.get('/tasks/:id', auth, async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user._id;

    // Task.findById(_id).then((task) => {
    //     res.status(201).send(task)
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })

    try {
        // const task = await Task.findById(_id);
        const task = await Task.findOne({ _id: taskId, owner: taskId })
        
        if(!task) {
            return res.status(404).send();
        }
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
})

// #Update/Modify task by id
router.patch('/tasks/:id', auth, async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user._id;

    const updates = Object.keys(req.body); //=> return an array of keys like { 'name', 'age', 'password' }
    // Only obj have all of keys allowed could update
    const allowedUpdates = ['description', 'completed'];
    // Check the updates[]
    // every() return true if all objs in the array true
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }
    try {
        const task = await Task.findOne({ _id: taskId, owner: userId})
        // const task = await Task.findById(_id);
        // update is the key we want to modify

        
        // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });

        if (!task) {
            return res.status(404).send();
        }
        
        updates.forEach((update) => {
            task[update] = req.body[update];
        })
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
})
// #DELETE task by id
router.delete('/tasks/:id', auth, async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user._id;

    try {
        // const task = await Task.findByIdAndDelete(_id);
        const task = await Task.findByIdAndDelete({_id: taskId, owner: userId});
        if (!task) {
            res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;