const router = require("express").Router();
const SecurityController = require("../controller/SecurityController");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `uploads/`);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

//REGISTER
router.post("/register", upload.single('file'), SecurityController.registerUser);
//LOGIN
router.post("/login", SecurityController.loginUser);

module.exports = router;