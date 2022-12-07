const { User, Profile } = require("../models")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

class SecurityController {

    static registerUser = (async (req, res) => {
        try {
            //genarete new password
            const salt = await bcrypt.genSalt(parseInt(process.env.PASS_SECRET));
            const hashedPassword = await bcrypt.hash(req.body.password, salt);


            // create new user
            const newUser = {
                user: req.body.user,
                password: hashedPassword,
            };
            //save user and response
            const savedUser = await new User(newUser).save();

            // create a new profile
            const newProfile = {
                name: req.body.name || req.body.user,
                user: savedUser._id
            }
            const savedProfile = await new Profile(newProfile).save();

            savedUser.profile = savedProfile._id;
            savedUser.save();

            res.status(201).json(savedProfile);
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    });

    static loginUser = (async (req, res) => {
        try {
            const user = await User.findOne({ user: req.body.user }).populate('profile');
            if (!user) return res.status(404).send({ message: "User not found" })

            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if (!validPassword) return res.status(400).json({ message: "Wrong Password" });

            const token = jwt.sign({ user: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' })

            return res.status(200).json({ token: token });
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }

    });


}
module.exports = SecurityController;

