const { User, Profile } = require("../models")
const bcrypt = require("bcrypt");

class UserController {

    static updateUser = (async (req, res) => {
        if (req.body.userId == req.params.id || req.body.isAdmin) {
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
                const user = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                });
                res.status(200).json("account updated")
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
        if (req.body.userId == req.params.id || req.body.isAdmin) {
            try {
                const user = await User.findById(req.params.id);

                await User.findByIdAndDelete(req.params.id);
                await Profile.findByIdAndDelete(user.profile);

                res.status(200).json({ message: "Account deleted" });
            } catch (err) {
                console.log(err)
                return res.status(500).json(err);

            }
        } else {
            return res.status(403).json({ message: "You can delet only your account" })
        }
    });

    static getUsers = (async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const { password, updatedAt, ...other } = user._doc
            res.status(200).json(other)
        } catch (err) {
            res.status(500).json(err)
        }
    });

}

module.exports = UserController;