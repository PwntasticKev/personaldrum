require("dotenv").config()
const AWS = require("aws-sdk")
const path = require("path")
const five = require("johnny-five")
const Board = new five.Board()
Board.on("ready", () => {
  const express = require("express")
  const massive = require("massive")
  const bodyParser = require("body-parser")
  const session = require("express-session")
  const passport = require("passport")
  const Auth0Strategy = require("passport-auth0")
  const cors = require("cors")
  const socket = require("socket.io")
  const S3 = require("./s3")

  const sensor = new five.Sensor({
    pin: "A0",
    freq: 30
  })

  const {
    CONNECTION_STRING,
    SESSION_SECRET,
    SERVER_PORT,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL
  } = process.env
  const app = express()
  const io = socket(
    app.listen(SERVER_PORT, () => {
      console.log(`listening on ${SERVER_PORT}`)
    })
  )
  app.use(bodyParser.json())
  app.use(cors())

  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: true
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(express.static(path.join(__dirname, "/../build")))

  massive(CONNECTION_STRING).then(db => {
    app.set("db", db)
  })

  passport.use(
    new Auth0Strategy(
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
        db
          .find_user([id])
          .then(async users => {
            if (users[0]) {
              return done(null, users[0])
            } else {
              //when someone is logginG in for the first time.
              return db
                .create_user([displayName, picture, id])
                .then(createdUser => {
                  return done(null, createdUser[0])
                })
            }
          })
          .catch(err => {
            console.log(err)
          })
        // return(null, profile)
        // console.log('listening?');
      }
    )
  )

  app.get("/auth", passport.authenticate("auth0"))

  app.get(
    "/auth/callback",
    passport.authenticate("auth0", {
      successRedirect: "http://localhost:3000/#/loggedin",
      failureRedirect: "http://localhost:3000/#/"
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    app
      .get("db")
      .find_session_user([user.id])
      .then(dbuser => {
        return done(null, dbuser[0])
      })
  })

  app.get("/auth/me", (req, res, next) => {
    // console.log(req.user)
    if (req.user) {
      return res.status(200).send(req.user)
    } else {
      return res.status(401).send("Log in required")
    }
  })

  app.get("/auth/logout", (req, res) => {
    req.logOut()
    return res.redirect("http://localhost:3000/#/")
  })

  app.get("/totaltabs/:search", (req, res, next) => {
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
  io.on("connection", connectionSocket => {
    console.log("user has connected")
    let start = false
    let recentHits = []
    let hit = []
    const play = require("play")
    // sensor.on("change", () => {
    //   if (!start) {
    //     start = Date.now()
    //   }
    //   const value = sensor.value
    //   if (sensor.value > 1) {
    //     play.sound("./snare.mp3")
    //     console.log("sensor val: ", sensor.value)
    //     // recentHits.push(Date.now() - start)
    //   }
    //   connectionSocket.emit("hit", recentHits)
    //   console.log("recent hits: ", recentHits)
    // })

    sensor.on("change", () => {
      const val = sensor.scaleTo(1, 40)
      console.log("val", val)
      if (!start) {
        start = Date.now()
      }
      if (val) {
        // const play = require("play")
        // console.log(play)
        // play.sound("./snare.mp3")
        // recentHits.push(Date.now() - start) // this is pushing the time when the drum was last hit.
        hit.push(Date.now() - start) // this is pushing the time when the drum was last hit.

        let filteredHit = hit.filter(() => {
          if (hit.length !== 1) {
            play.sound("./snare.mp3")
            let first = hit.shift(hit)
            recentHits.push(first)
            hit = []
            // console.log('first', first)
            console.log("this is the hit", hit)
          }
          return false
        })
      }

      console.log("this is the recent hit", recentHits)
      // }, 15, { 'edge': 'leading' })
      // let x = 251
      // let renderArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      // // let count = 0
      // let measure = 1

      // const mapFunc = (ele, i) => {
      //   if (ele < x) {
      //     renderArr[i] = 1
      //   } else {
      //     renderArr[i] = 0
      //   }
      //   // count++
      //   x = x + 250
      //   if (x > 4000) {
      //     measure++
      //     x = 251
      //     renderArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      //   }
      // }
      // let filterBar = recentHits.map(mapFunc)
    }) // end of on change
  }) // end of io.on
}) //end of board on. everything stays above here.
