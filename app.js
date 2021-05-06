/**
 * Module dependencies.
 */
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env' });

/**
 * Router (route handlers).
 */
// const containerRouter = require('./routes/container');
const foodItemRouter = require('./routes/foodItem');

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', err => {
    console.error(err);
    console.log(
        '%s MongoDB connection error. Please make sure MongoDB is running.',
        chalk.red('✗')
    );
    process.exit();
});

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//emable CORS
app.use(cors());

/**
 * Index Route
 */
app.get('/', (req, res) => {
    res.status(200).send({
        message: 'FrontEnd Flight Desk Backend Api Server.',
    });
});


/**
 * User routes
 */
app.use('/foodItem', foodItemRouter);

/**
 * Handle error routes
 */
app.all('*', (req, res) => {
    res.status(404).send({
        message: 'Route Not Found on Server.',
    });
});

/**
 * Global Error Handler.
 * @return Array of the errors with status code and the message
 */
if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
} else {
    app.use((err, req, res, next) => {
        if (typeof err === 'object' || Array.isArray(err)) {
            if (!Array.isArray(err)) {
                err = [err];
            }
            res.status(200).send({
                errors: err,
            });
        } else {
            console.log(err);
        }
    });
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
    console.log(
        '%s App is running at http://localhost:%d in %s mode',
        chalk.green('✓'),
        app.get('port'),
        app.get('env')
    );
    console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
