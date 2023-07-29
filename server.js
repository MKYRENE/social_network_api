// IMPORTING EXPRESS \\
const express = require('express');
const reaction = require('./routes/reaction-routes')
const thought = require('./routes/thought-routes')
const user = require('./routes/user-routes')
const db = require('./db/connection')

// OPENING UP CONNECTION \\
const app = express();


// SETTING UP GET REQ \\
app.get('/', (req, res) => {
  res.send('Congratulations! You\'re connected Michael!');
});


// Middleware \\
app.use(express.json());
app.use('/api/reaction', reaction)
app.use('/api/thoughts', thought)
app.use('/api/users', user)


const PORT = process.env.PORT || 3001;
// DB IS A VAR WHICH IS THE CONNECTION FILE, TELLING IT TO CONNECT ONCE 
//AND ONCE CONNECTED LISTEN TO A REQUEST
db.once('open', () => {
  // LAUCHING SERVER! \\
  app.listen(PORT, () => {


    console.log(`Server started on port ${PORT}`);
  });
})

