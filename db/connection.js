// IMPORTING MONGOOSE \\
const mongoose = require('mongoose');


//this is to test the connection for atlas
// const isProduction = true;
//console.log(process.env)

mongoose.connect('mongodb://127.0.0.1:27017/social-network-api');

// EXPORTING \\  
module.exports = mongoose.connection;




 





