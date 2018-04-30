const five = require('johnny-five')
let Board = new five.Board()
Board.on('ready', () => {
  
  require("dotenv").config()
//aws
  const AWS = require('aws-sdk')
  const S3 = require('./s3')
//aws
   sensor = new five.Sensor('A0'),
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
  hits = [];
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
    console.log('this', req.session);
    
    const { search } = req.params 
    const db = app.get("db")
    db.totalTabs([search.toUpperCase()]).then(totaltabs => {
      res.status(200).send(totaltabs)
    })
  })
  

  // AWS3 stuff



//mainjs
S3(app)



  //aws3 stuff





io.on("connection", (socket) => {
  console.log("user has connected")
  sensor.on("change", _.debounce(() => {
    let val = sensor.scaleTo(0, 1000)
    if (val > 1) {
      hits.push("√ ")
        socket.emit("hit", hits)
        // console.log(hits)
      }
      // if (val > 5) {
        //   hits.push('V')
        // }
      }, 75))
    })
    
  
  })
  
  
  
  // let io = socket(server)
  //ideas tips
  //start recording stop recording
  // empty array
  
  //sockets update live!
  
  