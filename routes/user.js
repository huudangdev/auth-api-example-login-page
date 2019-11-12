const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const {validRegister, validLogin} = require('../validation');

router.get('/', (req, res) => {
    res.send('Hello, please Login or Register!');
});

router.post('/register', async (req, res) => {
    // Valid Form
    const {error} = validRegister(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    // Check already email
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send({message: 'email already exist'});

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: passwordHashed
    });
    try {
        const addNewUser = await newUser.save();
        res.json(addNewUser);
    } catch(err) {
        res.status(400).json({message: err});
    }
});

router.post('/login', async (req, res) => {
    // Basic Valid
    const {error} = validLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Find email
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email not found');
    // Check Password
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Email or Password is wrong');
    //Create and assign token
    const token = jwt.sign({_id: user._id}, process.env.SCERET_KEY);
    res.header('auth-token', token).send(token);
});

module.exports = router;