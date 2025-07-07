const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jst = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');

const secretkey = 'prince';

router.post('/createuser', [
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ error: "This gmail id already exists" });

    }
    const salt = await bcrypt.genSalt();
    const Secpass = await bcrypt.hash(req.body.password, salt);
    let user2 = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: Secpass
    })
        .catch(err => {
            ////console.log(err);
            res.json({ error: err.message });
            res.json({ error: "This Name Already Exists" });
        })

    let payload = {
        id: user2.id
    }
    console.log("Check that is payload is same as = " + payload.id);
    const authenticationtoken = jst.sign(payload, secretkey);
    console.log(authenticationtoken);
    return res.json({ user: user2, authenticationtoken });

})


//So after the user will login we have to check for credentials of login and then assign jstauthenticationauthenticationtoken and see that is it //correct 
router.post('/login', [
    body('email').isEmail(),
    body('password').exists()
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });
        console.log(user);
        if (!user) {
            return res.status(400).json({ error: "The credentials are wrong" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "The credentials are wrong, enter the right one" });
        }

        let payload = {
            id: user.id
        };

        const authenticationtoken = jst.sign(payload, secretkey);
        if (authenticationtoken) {
            //localStorage.setItem({'token':authenticationtoken});
            res.json({ authenticationtoken, message: "Welcome to the login page" });
        }

    } catch (error) {
        res.status(500).send({ error: "We have some mistakes on our side" });
    }
});


router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userid = req.user;
        const user = await User.findById(userid).select("-password");
        res.send(user);
    } catch (error) {
        res.status(400).send({ error: "There is some error from our side" }); // again res not req
    }
});


module.exports = router;