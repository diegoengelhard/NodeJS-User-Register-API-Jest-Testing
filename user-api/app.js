require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sequelize = require('./database');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./routes/api/index.router');
const errorHandler = require('./middlewares/error.middleware');

const app = express();
const DB_PORT = process.env.DB_PORT || 3500;

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// Main route
app.use("/api", apiRouter);

// Error handler
app.use(errorHandler);

// DB connection
sequelize.sync().then(() => {
    app.listen(DB_PORT, () => {
        console.log(`Server is running on port ${DB_PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = app;
