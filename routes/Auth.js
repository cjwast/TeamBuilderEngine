const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;


/**
|--------------------------------------------------
| URL: auth/
| Verb: POST
| Description: This will create a new user
|--------------------------------------------------
*/
router.post('/', (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({ email, password });

    if (email === "" || password === "") {
        return res.status(400).json({ message: "Indicate username and password" });
        return;
    }


    User.findOne({ 'email': email })
        .then(user => {
            if (user !== null) {
                return res.status(409).json({ message: "the user already exist" });
            }
            else {
                const salt = bcrypt.genSaltSync(bcryptSalt);
                const hashPass = bcrypt.hashSync(password, salt);
                newUser.password = hashPass;

                newUser.save()
                    .then(userResponse => {
                        //here we should return the token for that user
                        jwt.sign({ userResponse }, process.env.SECRET_KEY, { expiresIn: '1h', algorithm: process.env.ALGORITHM }, (err, token) => {
                            //I really don't care the err XD
                            res.status(200).json(
                                { token }
                            );
                        })
                    })
                    .catch(err => console.error(err));
            }
        })
        .catch(err => console.error(err));
});


/**
|--------------------------------------------------
| URL: auth/login
| Verb: POST
| Description: This method is to authenticate the user
|--------------------------------------------------
*/
router.post('/login', (req, res, next) => {
    const { email, password } = req.body;

    if (email === "" || password === "") {
        return res.status(400).json({ message: "Indicate username and password" });
        return;
    }

    console.log(`email recibido => ${email}, password => ${password}`)

    User.findOne({ 'email': email })
        .then(user => {
            console.log(`usuario encontrado=> ${user}`)
            if (user !== null) {
                //que si existe usuario
                //comparamos el pasword
                if (bcrypt.compareSync(password, user.password)) {
                    const findUser = new User(
                        {
                            email: user.email,
                        }
                    );
                    //generamos el token con jwt para responder al login
                    jwt.sign({ findUser }, process.env.SECRET_KEY, { expiresIn: '1h', algorithm: process.env.ALGORITHM }, (err, token) => {
                        //I really don't care the err XD
                        if (err !== null) {
                            console.error(err);
                            res.status(401).json({ message: "please verify the information" });
                        } else {
                            res.status(200).json(
                                { token }
                            );
                        }
                    })
                }
                else {
                    //mensaje ambiguo
                    res.status(401).json({ message: "please verify the information" });
                }
            }
            else {
                //mensaje ambiguo
                res.status(401).json({ message: "please verify the information" });
            }
        })
        .catch(err => console.log(err));
})


module.exports = router;