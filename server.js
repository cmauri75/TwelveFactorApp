const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express()

var pjson = require('./package.json');


let mongoHost = process.env.MONGO_HOST;
let mongoPort = process.env.MONGO_PORT;
let dbName = process.env.MONGO_DB;
let appPort = process.env.PORT;

let isReady = false;

app.use(bodyParser.json());
console.log('App started!');

console.log('Registering routes');

app.use('/api', require('./routes/hotels'));
app.use('/api', require('./routes/users'));
app.use('/api', require('./routes/bookings'));
app.use('/api', require('./routes/rooms'));

app.use('/version', function (req, res) {
    res.status(200).send(`Version ${pjson.version}`)
})

app.use('/health', function (req, res) {
    res.status(200).send('Alive')
})

app.use('/readiness', function (req, res) {
    let status = isReady ? 200 : 500;
    res.status(status).send(`status: ${pjson.status}`)
})

app.use((err, req, res, next) => {
    res.status(422).send({error: err.message});
});

// Database URL
let url = `mongodb://${mongoHost}:${mongoPort}/${dbName}`;

(async () => {
    try {
        await mongoose.connect(url, {
            "useNewUrlParser": true,
            "useUnifiedTopology": true,
            'serverSelectionTimeoutMS': 100
        })
        console.log("Database connected!")
        mongoose.Promise = global.Promise;
        isReady = true;

        mongoose.connection.on('connected', () => {
            console.log(`Mongoose connected`);
        });
        mongoose.connection.on('error', (err) => {
            console.log('Mongoose connection error:', err);
        });
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected');
            isReady = false;
            process.exit(2)
        });

    } catch (e) {
        console.log("Impossible to connect to database")
        process.exit(1)
    }

    // For Heroku app termination
    process.on('SIGTERM', () => {
        gracefulShutdown('Heroku app shutdown', () => {
            process.exit(0);
        });
    });


    app.listen(appPort, () => {
        console.log(`App listening at http://localhost:${appPort}`)
    })

})()




