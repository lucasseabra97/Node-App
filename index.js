const express = require('express');
const Joi = require('@hapi/joi');
const app = express();

app.use(express.json());

const genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Romance'},
    {id: 3, name: 'Thriller'},
]

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.get('/api/genres', (req,res)=>{
    res.send(genres);
})

app.get('/api/genres/:id',(req,res)=>{
   const genre =  genres.find(c => c.id ===parseInt(req.params.id))
   if(!genre) return res.status(404).send('The genre with the given ID was not found')

   res.send(genre);
})

app.post('/api/genres',(req,res) =>{
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre);

})

app.put('/api/genres/:id',(req,res)=>{
    const genre =  genres.find(c => c.id ===parseInt(req.params.id))
    if(!genre) return res.status(404).send('The genre with the given ID was not found')
    
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
})

app.delete('/api/genres/:id',(req,res)=>{
    const genre =  genres.find(c => c.id ===parseInt(req.params.id))
    if(!genre) return res.status(404).send('The genre with the given ID was not found')

    const idx = genres.indexOf(req.params.id);
    genres.splice(idx,1);

    res.send(genre);
})


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(genre);
}