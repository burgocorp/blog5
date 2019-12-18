const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');

const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config();



const userRoute = require('./route/user');
const profileRoute = require('./route/profile');



require('./db');



app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));
app.use(passport.initialize());
require('./config/passport')(passport);


app.use('/user', userRoute);
app.use('/profile', profileRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log('server started...'));
