const express = require('express');
const mongoose = require('mongoose');

// dot env config
const dotenv = require('dotenv');
dotenv.config();

// Setting
const app = express();
app.use(express.json());

// Connect Db
const db = process.env.DB_URI;
mongoose.connect(
    db, 
    {useNewUrlParser: true}, 
    () => console.log('DB connected...')
);

// Routes
app.use('/user', require('./routes/user'));

// Run Server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Running...'));