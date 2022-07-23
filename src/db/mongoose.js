const mongoose = require('mongoose');
// const connectionString = 'mongodb://127.0.0.1:27017/task-manager-api';
const connectionString = 'mongodb://172.17.0.2:27017/task-manager-api';
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
})

