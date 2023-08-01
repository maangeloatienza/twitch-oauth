const request = require('request')
const config = require('../config')
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy
const axios = require('axios');
const twitchStrategy = require('passport-twitch').Strategy

const OAuth = ()=> {
  return OAuth2Strategy.prototype.userProfile = (accessToken, done) => {

    console.log("Access Token", accessToken)
    let options = {
      url : 'https://api.twitch.tv/helix/users',
      method: 'GET',
      headers : {
        'Client-ID' : config.TWITCH_CLIENT_ID,
        'Accept' : 'application/vnd.twitchtv.v5.json',
        'Authorization' : `Bearer ${accessToken}`
      }
    }

    axios(options)
      .then(function (response) {
        console.log("RESPONSE",response)
        done(null,response)
      });
    
  }
}



module.exports = OAuth