const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOURL,{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err.message));