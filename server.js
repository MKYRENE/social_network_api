// IMPORTING EXPRESS \\
const express = require('express');
const reaction = require('./routes/reaction-routes')
const thought = require('./routes/thought-routes')
const user = require('./routes/user-routes')
const db = require('./db/connection')

// OPENING UP CONNECTION \\
const app = express();

app.use(express.json());

// SETTING UP GET REQ \\
app.get('/', (req, res) => {
  res.send('Congratulations! You\'re connected Michael!');
});


// // Middleware \\
// app.use('/api', reaction)
// app.use('/api', thought)
// app.use('/api', user)

//Pass in array of routes
app.use('/api',[reaction, thought, user]);


const PORT = process.env.PORT || 3001;
// DB IS A VAR WHICH IS THE CONNECTION FILE, TELLING IT TO CONNECT ONCE 
//AND ONCE CONNECTED LISTEN TO A REQUEST
db.once('open', () => {
  // LAUCHING SERVER! \\
  app.listen(PORT, () => {


    console.log(`Server started on port ${PORT}`);
  });
})

