const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Set up routes

 mongoose.connect('mongodb://127.0.0.1:27017/social-network-api'
 )


// Use route files
app.use(require('./routes/user-routes'));
app.use(require('./routes/thought-routes'));
app.use(require('./routes/reaction-routes'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
