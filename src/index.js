const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()
const port = process.env.PORT || 3000

// Without middleware: new request -> run route handler
//
// With middleware: new request -> do something -> run route handler
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disable')
//     } else {
//         next();
//     }
// })

// Automaticly parse incoming JSON to an object
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log("Server is up on port " + port);
})

// #TEST bcrypt
// const bcrypt = require('bcryptjs');

// const myFunction = async () => {
//     const password = 'Hieuz123456';
//     const hashedPassword = await bcrypt.hash(password, 8);

//     console.log(password);
//     console.log(hashedPassword);

//     const isMatch = await bcrypt.compare('Hieuz123456', hashedPassword);
//     console.log(isMatch);
// }

// myFunction()

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'hellowhatyourname', { expiresIn: '7 days'});
//     console.log(token);

//     const data = jwt.verify(token, 'hellowhatyourname');
//     console.log(data);
// }

// myFunction();

// # Test toJSON()
// const pet = {
//     name: 'Cat'
// }
// pet.toJSON = function () {
//     return {}
// }
// console.log(JSON.stringify(pet));

// const Task = require("./models/task")
// const User = require("./models/user")

// const main = async () => {
//     // const task = await Task.findById('6263ce508d4d50d6467cd98d');
//     // await task.populate('owner');
//     // console.log(task);

//     const user = await User.findById('6263ce0a2b743f90573e8414');
//     await user.populate('tasks');
//     console.log(user.tasks);
// }

// main();