// # CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectId

const { MongoClient, ObjectId} = require('mongodb')

// const id = new ObjectId()
// console.log(id)
// console.log(id.getTimestamp());

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager' //DB name

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to the database');
    }

    //console.log('Connected correctly');
    // Choose what database to interact with
    const db = client.db(databaseName)
    // #CREATE DATA
    // Choose what collection to interact with
    // db.collection('users').insertOne({
    //     name: "HieuZZZ",
    //     age: 22
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user');
    //     }

    //     console.log(result);
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 15
    //     },
    //     {
    //         name: 'Jinx',
    //         age: 15
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user');
    //     }

    //     console.log(result.ops);
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Eat',
    //         completed: false
    //     },
    //     {
    //         description: 'Sleep',
    //         completed: true
    //     },
    //     {
    //         description: 'Study',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user');
    //     }

    //     console.log(result);
    // })

    //#READ DATA

    // db.collection('users').findOne({ name: 'Jen', age: 1}, (error, user) => {
    //     if (error) {
    //         return console.log("Unable to fetch");
    //     }
    //     if (user = null) {
    //         return console.log("This user was not found!");
    //     }
    //     console.log(user);
    // })

    //find() dont have callback
    // db.collection('users').find({ name: 'HieuZ'}).toArray((error, users) => {
    //     console.log(users);
    // })
    // db.collection('users').find({ name: 'HieuZ'}).count((error, users) => {
    //     console.log(users);
    // })

    // db.collection('tasks').find({ completed: false}).toArray((error, tasks) => {
    //     console.log(tasks);
    // })
    // #UPDATE
    // db.collection('users').updateOne({
    //     name: 'Vi'
    // }, {
    //     $set: {
    //         name: 'Vi'
    //     },
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // db.collection('tasks').updateMany({}, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

// $currentDate
// Sets the value of a field to current date, either as a Date or a Timestamp.

// $inc
// Increments the value of the field by the specified amount.

// $min
// Only updates the field if the specified value is less than the existing field value.

// $max
// Only updates the field if the specified value is greater than the existing field value.

// $mul
// Multiplies the value of the field by the specified amount.

// $rename
// Renames a field.

// $set
// Sets the value of a field in a document.

// $setOnInsert
// Sets the value of a field if an update results in an insert of a document. Has no effect on update operations that modify existing documents.

// $unset
// Removes the specified field from a document.

    // #DELETE
    // db.collection('users').deleteOne({ name: 'Vi'}).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    db.collection('users').deleteMany({ name: 'HieuZ'}).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })
})
