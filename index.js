const mongoose  = require('mongoose')
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();


const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/vidly';

mongoose.connect(mongoURL, {useNewUrlParser:true, useUnifiedTopology: true })
    .then(()=>console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to mongoDB...'))

app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);

app.get('/',(req,res)=>{
    res.send('Hello World')
})


app.listen(port, "0.0.0.0",() => {
    console.log(`Listening on port ${port}...`)
});


