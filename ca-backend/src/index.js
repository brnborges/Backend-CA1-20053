const express = require('express');
const connectDB = require('./database/index');
const app = express();
const bodyParser = require('body-parser');

//Getting connection to DB 
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Route created
app.use('/accounts', require('./routes/user'));

// Listenning to database
app.listen(3000, () => console.log('Server started on port 3000'));