const passport = require('passport')
const express = require('express')
const router = express.Router();



router.get('/auth/twitch', passport.authenticate('twitch', { scope : 'user_read' }))
router.get('/auth/twitch/callback', passport.authenticate('twitch', { successRedirect: '/', failureRedirect: '/'}))


module.exports = router;