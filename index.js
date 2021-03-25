const mongoose  = require('mongoose')
const genres = require('./routes/genres');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost:27017/vidly', {useNewUrlParser:true, useUnifiedTopology: true })
    .then(()=>console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to mongoDB...'))

app.use(express.json());
app.use('/api/genres',genres);



const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0",() => {
    console.log(`Listening on port ${port}...`)
});


