const express = require('express')
const FeedController = require('../controller/FeedController')
const router = express.Router()


// router.route('/')

router.get ("/", FeedController.getFeed);

module.exports = router;


