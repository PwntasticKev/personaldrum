const five = require('johnny-five')
let Board = new five.Board()
Board.on('ready', () => {
  
  require("dotenv").config()
//aws
  const AWS = require('aws-sdk')
  const S3 = require('./s3')
//aws
   sensor = new five.Sensor({
    pin: "A0", 
    freq: 30, 
    threshold: 1
  })
   express = require('express'),
   http = require('http'),
   server = http.createServer(),
   _ = require('lodash'),
   massive = require('massive'),
   bodyParser = require('body-parser'),
   session = require('express-session'),
   passport = require('passport'),
   Auth0Strategy = require('passport-auth0'),
   cors = require('cors'),
   c = './controller',
   { CONNECTION_STRING, 
    SESSION_SECRET, 
    SERVER_PORT, 
    DOMAIN, 
    CLIENT_ID, 
    CLIENT_SECRET, 
    CALLBACK_URL } = process.env
    const app = express()
    const io = require("socket.io")(app.listen(SERVER_PORT, () => {
      console.log(`listening on ${SERVER_PORT}`)
      }))
  let hit; // arduino hits array
  app.use(bodyParser.json())
  app.use(cors())
  
  app.use(session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: true
    }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(express.static(__dirname + "/../build"))
  
  
  massive(CONNECTION_STRING).then(db => {
    app.set("db", db)
  })

  passport.use(new Auth0Strategy(
      {
        domain: DOMAIN,
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: CALLBACK_URL,
        scope: "openid profile"
      },
      (accessToken, refreshToken, extraParams, profile, done) => {
        const { id, displayName, picture } = profile
        const db = app.get("db")
        db.find_user([id]).then( users => {
        if ( users[0] ){
        return done(null, users[0])
        }
        else { //when someone is logginG in for the first time.
        db.create_user([displayName, picture, id]).then( createdUser => {
        return done( null,createdUser[0] )
        } ) }
        } ).catch(err => {
            console.log(err)
        })
        // return(null, profile)
        // console.log('listening?');
      }
    ))
        

  app.get("/auth", passport.authenticate("auth0"))

  app.get("/auth/callback", passport.authenticate("auth0", {
      successRedirect: "http://localhost:3000/#/loggedin",
      failureRedirect: "http://localhost:3000/#/"
    }))

  passport.serializeUser(function(user, done) {
    done(null, user)
  })

  passport.deserializeUser(function(user, done) {
    app.get("db").find_session_user([user.id]).then(user => {
      
        return done(null, user[0])
      })
  })

  app.get("/auth/me", (req, res, next) => {
    // console.log(req.user)
    if (!req.user) {
      return res.status(401).send("Log in required")
    } else {
      return res.status(200).send(req.user)
    }
    
  })

  app.get("/auth/logout", (req, res) => {
    req.logOut()
    return res.redirect("http://localhost:3000/#/")
  })

  app.get('/totaltabs/:search', (req,res,next) => {
    const { search } = req.params 
    const db = app.get("db")
    db.totalTabs([search.toUpperCase()]).then(totaltabs => {
      res.status(200).send(totaltabs)
    })
  })
  
  // AWS3 stuff
S3(app)
  //aws3 stuff




//sockets and arduino code
io.on("connection", (socket) => {
  console.log("user has connected")
  let recentHits =[]; 
  let start = false;
  let hit = []
  
  sensor.on("change", () => {
// const throttle = _.throttle(() => {
  let val = sensor.scaleTo(1, 40)
  console.log('val', val)
  if(!start){
    start = Date.now();
  }
if (val) {
  // recentHits.push(Date.now() - start) // this is pushing the time when the drum was last hit. 
  hit.push(Date.now() - start) // this is pushing the time when the drum was last hit. 
  
}
let filteredHit = hit.filter(filteredHits => {
  if (hit.length !== 1) {
    let first = hit.shift(hit)
    recentHits.push(first)
    hit = []
    // console.log('first', first)
    // console.log('this is the hit',hit);
  }
  socket.emit("hit", recentHits)
  return false
  
})
console.log('this is the recent hit',recentHits);
    // }, 15, { 'edge': 'leading' })


  })
  })
  
})
