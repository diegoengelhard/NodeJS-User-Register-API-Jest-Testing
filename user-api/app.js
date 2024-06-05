var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize = require('./database');
const bodyParser = require('body-parser');

var app = express();
const DB_PORT = process.env.PORT || 3500;

// Imports cors middleware
const cors = require('cors');

// Imports index router middleware
const apiRouter = require('./routes/api/index.router');

// Impots error handler middleware
const errorHandler = require('./middlewares/error.middleware');

// Mounts error handler middleware
app.use(errorHandler);

// Imports body-parser middleware
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Enables cors
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Mounts index router middleware
app.use("/api", apiRouter);

// database connection
sequelize.sync().then(() => {
    app.listen(DB_PORT, () => {
        console.log(`Server is running on port ${DB_PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});


module.exports = app;
