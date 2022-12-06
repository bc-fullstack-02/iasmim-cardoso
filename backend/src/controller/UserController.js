const { User, Profile } = require("../models")
const bcrypt = require("bcrypt");

class UserController {

    static updateUser = (async (req, res) => {
        if (req.user) {
            if (req.body.password) {
                try {
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password, salt);
                } catch (err) {
                    console.log(err)
                    return res.status(500).json(err);
                }
            }
            try {
                await User.findByIdAndUpdate(req.user._id, {
                    $set: req.body,
                });
                res.status(200).json({ message: "account updated" })
            } catch (err) {
                console.log(err)
                return res.status(500).json(err);
            }
        } else {
            console.log(err)
            return res.status(403).json("cant update")
        }
    });

    static deleteUser = (async (req, res) => {
        if (req.user) {
            try {
                await User.findByIdAndDelete(req.user._id);
                await Profile.findByIdAndDelete(req.user.profile._id);

                res.status(200).json({ message: "Account deleted" });
            } catch (err) {
                console.log(err)
                return res.status(500).json(err);

            }
        } else {
            return res.status(403).json({ message: "You can delete only your account" })
        }
    });

    static getUsers = (async (req, res) => {
        try {
            const user = await User.findById(req.user._id);
            const { password, updatedAt, ...other } = user._doc
            res.status(200).json(other)
        } catch (err) {
            res.status(500).json(err)
        }
    });

}

module.exports = UserController;