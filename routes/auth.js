const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const express = require('express');
const Joi = require('joi');
const passwordComplexity =  require('joi-password-complexity');
const router = express.Router();


const complexityOptions = {
    min: 5,
    max: 250,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
  };
//register user endpoit
router.post('/', async(req,res)=>{

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
   

    if (!req.body.password) return res.status(400).send("Password is required..");

    let user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password,user.password);

    if(!validPassword) return res.status(400).send('Invalid email or password.');

    //MISSING JWT!!!!!!!
    res.send(true);
})

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: passwordComplexity(complexityOptions).required()
    });
    return schema.validate(req);
}

module.exports = router;    