const express = require('express')
const session = require('express-session')
const passport = require('passport')
const path = require('path')
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy
const twitchStrategy = require("passport-twitch").Strategy;
const app = express()
const config = require('./config')
const OAuth = require('./utils/passport')
const twitchAuth = require('./utils/twitch-auth')
const authRoutes = require('./routes/auth')


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'))
app.use(session({
  secret : config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(passport.initialize())
app.use(passport.session())

// override passport profile function to get the user profile from TWITCH API
// OAuth();


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization')
  next()
});

passport.serializeUser((user,done)=> {
  done(null,user)
})

passport.deserializeUser((user,done)=> {
  done(null,user)
})


// passport.use('twitch', new twitchStrategy(twitchAuth.passportOAuth,(accessToken, refreshToken,profile,done)=>{
//   console.log("PROFILE",profile)
  
//   profile.accessToken = accessToken
//   profile.refreshToken = refreshToken

//   done(null, profile)
// }))
passport.use('twitch', new OAuth2Strategy(twitchAuth.passportOAuth,(accessToken, refreshToken,profile,done)=>{
  console.log("PROFILE",profile)
  
  profile.accessToken = accessToken
  profile.refreshToken = refreshToken

  done(null, profile)
}))


// app.use('/',authRoutes)
// app.use('/api',router)


app.get("/auth/twitch", passport.authenticate("twitch"));
app.get("/auth/twitch/callback", passport.authenticate("twitch", { failureRedirect: "/" }), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
});

app.get('/', function(req,res,next){
  let data = req.session.passport
  console.log(req.session)
  res.send({
    profile: data
  }).status(200)
})



module.exports = app;