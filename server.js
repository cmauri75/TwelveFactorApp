const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express()

let mongoHost = process.env.MONGO_HOST;
let mongoPort = process.env.MONGO_PORT;
let dbName = process.env.MONGO_DB;
let appPort = process.env.PORT;

app.use(bodyParser.json());
console.log('App started!');

console.log('Registering routes');

app.use('/api', require('./routes/hotels'));
app.use('/api', require('./routes/users'));
app.use('/api', require('./routes/bookings'));
app.use('/api', require('./routes/rooms'));

app.use((err, req, res, next) => {
    res.status(422).send({error: err.message});
});

// Database URL
let url = `mongodb://${mongoHost}:${mongoPort}/${dbName}`;

( async () => {
    try {
        await mongoose.connect(url, {
            "useNewUrlParser": true,
            "useUnifiedTopology": true,
            'serverSelectionTimeoutMS': 100
        })
        console.log("Database connected!")
        mongoose.Promise = global.Promise;
    } catch (e) {
        console.log("Impossible to connect to database")
    }

    app.listen(appPort, () => {
        console.log(`App listening at http://localhost:${appPort}`)
    })

})()




