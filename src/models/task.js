const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // create a relationship
    }
}, {
    timestamps: true
});

taskSchema.pre('save', async function(next) {
    console.log("just before next");

    next();
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task