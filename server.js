// IMPORTING EXPRESS \\
const express = require('express');


// OPENING UP CONNECTION \\
const app = express();


// SETTING UP GET REQ \\
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Middleware \\
app.use(express.json());


const PORT = process.env.PORT || 3333;

// LAUCHING SERVER! \\
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
