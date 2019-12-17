const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const userRoute = require('./route/user');
const dotenv = require('dotenv');
dotenv.config();


require('./db');

app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));

app.use('/user', userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log('server started...'));
