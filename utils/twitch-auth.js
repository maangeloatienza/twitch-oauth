const config = require('../config')

const authorize = (params)=> {
  return `${config.TWITCH_AUTHORIZED_ENDPOINT}?client_id=${config.TWITCH_CLIENT_ID}&force_verify=${params.force_verify}&redirect_uri=${config.CALLBACK_URL}&scope=${params.scope}&state=${params.state}`
}

const passportOAuth = {
  authorizationURL: `${config.TWITCH_AUTHORIZED_ENDPOINT}`,
  tokenURL: `${config.TWITCH_ENDPOINT}/token`,
  clientID: config.TWITCH_CLIENT_ID,
  clientSecret: config.TWITCH_SECRET,
  callbackURL: config.TWITCH_CALLBACK_URL,
  state: true
}


module.exports = {
  authorize,
  passportOAuth
}