const mongoose = require('mongoose')
const connectionString = process.env.DATABASE
mongoose.connect(connectionString, {

}).then(() => {
        console.log('mongoose successfull...');
    }).catch(() => {
        console.log('mongoose error');
    })