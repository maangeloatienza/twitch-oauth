const app = require('./app');
require('dotenv').config()

let PORT = process.env.PORT

app.listen(PORT,()=>{
  console.log(`Twitch 3rd Party API listening on PORT ${PORT}`)
})