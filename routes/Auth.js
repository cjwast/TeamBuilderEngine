const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;


/**
|--------------------------------------------------
| URL: users/
| Verbo: POST
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
            console.log(`comparacion => ${(typeof user !== 'undefined')}`)
            if (user !== null) {
                console.log(`usuario =>${user}`)
                return res.status(409).json({ message: "the user already exist" });
            }
            else {
                const salt = bcrypt.genSaltSync(bcryptSalt);
                const hashPass = bcrypt.hashSync(password, salt);
                newUser.password = hashPass;

                newUser.save()
                    .then(userResponse => {
                        //here we should return the token for that user
                        //pendiente revisar la verificación de correo??? SHIT!
                        jwt.sign({ userResponse }, 'secretkey', { expiresIn: '1h' }, (err, token) => {
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


module.exports = router;