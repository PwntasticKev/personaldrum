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

const throttle = _.throttle(() => {
  let val = sensor.scaleTo(1, 40)
  console.log('val', val)
  if(!start){
    start = Date.now();
  }
if (val) {
  // recentHits.push(Date.now() - start) // this is pushing the time when the drum was last hit. 
  hit.push(Date.now() - start) // this is pushing the time when the drum was last hit. 

    let filteredHit = hit.filter(filteredHits => {
if (hit.length !== 1) {
  let first = hit.unshift()
     recentHits.push(first)
     hit = []
 }
return true

})
              
     socket.emit("hit", recentHits)
      console.log('this is the hit',hit);
      console.log('this is the recent hit',recentHits);
        
      }
    }, 15, { 'edge': 'leading' })

  sensor.on("change", throttle)
  })
  
})


  
  
  // let io = socket(server)
  //ideas tips
  //start recording stop recording
  // empty array
  
  //sockets update live!
  
 
    //every four seconds is an array
    // if the drum hasnt been hit in 7 seconds. create new array and setdate to 0
  //   let start = false;
    
  //   const throttle = _.throttle(() => {
  //     let val = sensor.scaleTo(1,100)
  //     let hit = []
  //     let valArr= []
  //     console.log('val = ', val)
  //           if(!start){
  //                 start = Date.now();
  //               }
  //               // if (val) {
  //               //   hit.push(start = Date.now())
  //               //   let filteredHit = hit.filter(filteredHits => {
  //               //         if (hit.length !== 1) {
  //               //           let first = hit.unshift()
  //               //           let remove = hit.splice(2)
  //               //           console.log('this is the hit array', hit)
  //               //           console.log('this is first', first)
  //               //           console.log('this is the removed', remove)
  //               //           // recentHits.push(hit[0])
  //               //         }
  //               //       })
  //               //       recentHits.push(filteredHit)
  //               //     }
                      
            
  //                   // recentHits.push(Date.now() - start)
  //                   socket.emit("hit", recentHits)
  //                   console.log(recentHits)
                
  //             }, 15)

  // sensor.on("change", throttle)
  //   // thoughts before bed. 
  //   // will debounce throw off the set intervals?
  //   // switch starement?
 
  // setInterval(() => {
  //   //if val() {}
  //   setTimeout(() => {
  //     console.log('250')
  //     if (hits == 1 ) {
  //       hits.push(['hit'])
  //       console.log('ive been hit!')
  //     } else {
  //       hits.push(['rest'])
  //       console.log('rest baby!')
  //     }
  //     // Check beat count and do something
  //   }, 250)
  //   setTimeout(() => {
  //     console.log('500')
  //   }, 500)
  //   setTimeout(() => {
  //     console.log('750')
  //     // Check beat count and do something
  //   }, 750)
  //   setTimeout(() => {
  //     console.log('1000')
  //     // Check beat count and do something
  //   }, 1000)
  //   setTimeout(() => {
  //     // Check beat count and do something
  //   }, 1250)
  //   setTimeout(() => {
  //   console.log('1500') 
  //   // Check beat count and do something
  //   }, 1500)
  //   setTimeout(() => {
  //     console.log('1750')
  //     // Check beat count and do something
  //   }, 1750)
  //   setTimeout(() => {
  //     console.log('2000')
  //     // Check beat count and do something
  //   }, 2000)
  //   setTimeout(() => {
  //     console.log('2250')
  //     // Check beat count and do something
  //   }, 2250)
  //   setTimeout(() => {
  //     console.log('2500')
  //     // Check beat count and do something
  //   }, 2500)
  //   setTimeout(() => {
  //     console.log('2750')
  //     // Check beat count and do something
  //   }, 2750)
  //   setTimeout(() => {
  //     console.log('3000')
  //     // Check beat count and do something
  //   }, 3000)
  //   setTimeout(() => {
  //     console.log('3250')
  //     // Check beat count and do something
  //   }, 3250)
  //   setTimeout(() => {
  //     console.log('3500')
  //     // Check beat count and do something
  //   }, 3500)
  //   setTimeout(() => {
  //   console.log('3750') 
  //   // Check beat count and do something
  //   }, 3750)
  //   setTimeout(() => {
  //     console.log('4000')
  //     //socket emit?
  //     // Check beat count and do something
  //   }, 3980)
  // }, 4000 /* the time every beat should take */)
  

  
  
  
  // let io = socket(server)
  //ideas tips
  //start recording stop recording
  // empty array
  
  //sockets update live!
  
  