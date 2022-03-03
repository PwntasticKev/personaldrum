require("dotenv").config()
const path = require("path")
const five = require("johnny-five")
// const AWS = require("aws-sdk")
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
  app.use(bodyParser.json({ limit: "40mb" }))
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
        db.find_user([id])
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
      successRedirect: "http://localhost:3000/#/home", //digital ocean. change for hosting. change anywehre it says local host
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

  app.get("/totaltabs", (req, res, next) => {
    const { search } = req.query
    const db = app.get("db")
    // console.log("search!!", typeof search, search)

    if (search) {
      db.totalTabs([search.toUpperCase()]).then(totaltabs => {
        res.status(200).send(totaltabs)
      })
      // make sql to grab only tabs select * from tabs
    } else {
      db.selectAll().then(totaltabs => {
        res.status(200).send(totaltabs)
      })
    }
  })

  app.get("/sheetMusic/:id", (req, res) => {
    console.log(req.params.id)
    const db = app.get("db")
    db.selectUri(req.params.id)
      .then(sheetMusic => {
        // console.log(sheetMusic)

        res.status(200).send(sheetMusic)
      })
      .catch(console.log)
  })

  app.delete(`/deletetab/:id`, (req, res) => {
    console.log("this is it", req.params.id)
    const db = app.get("db")
    db.delete_tab([req.params.id]).then(deletedTab => {
      res.status(200).send(deletedTab)
    })
  })

  app.put(`/updateTab/:id`, (req, res) => {
    const { id } = req.params
    const { songName, artist, albumName } = req.body
    const db = app.get("db")
    db.updateTab([id, songName, artist, albumName]).then(updatedTab => {
      res.status(200).send(updatedTab)
    })
  })

  app.get(`/song/:id`, (req, res) => {
    const db = app.get("db")
    const { id } = req.params
    // const { songName, artist, albumName } = req.body
    console.log("its getting hit")
    // console.log(songName, artist, albumName)
    db.select_song([id]).then(song => {
      console.log(song, "this is songname")
      res.status(200).send(song)
    })
  })

  // AWS3 stuff
  S3(app)
  //aws3 stuff

  //sockets and arduino code
  io.on("connection", connectionSocket => {
    console.log("Socket on. play!!")
    let renderArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let start = false
    const recentHits = []
    let hit = []
    // const play = require("play")
    let count = 0
    let measure = 0
    let measureObj = {
      measure: 0,
      renderArr: []
    }

    sensor.on("change", () => {
      // play.sound("./snare.mp3")
      const val = sensor.scaleTo(1, 40)
      console.log("val", val)
      if (!start) {
        start = Date.now()
      }

      count = ~~((hit - 4000 * measure) / 250)
      renderArr[count] = 1

      if (hit > 4000 * (measure + 1)) {
        console.log("we made a new measure magic")
        renderArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        measure++
      }
      measureObj = {
        measure,
        renderArr
      }
      connectionSocket.emit("hit", measureObj)

      // let filterBar = recentHits.map()
      if (val) {
        // const play = require("play")
        // console.log(play)
        // play.sound("./snare.mp3")
        // recentHits.push(Date.now() - start) // this is pushing the time when the drum was last hit.
        hit.push(Date.now() - start) // this is pushing the time when the drum was last hit.

        const filteredHit = hit.filter(() => {
          if (hit.length !== 1) {
            const first = hit.shift(hit)
            recentHits.push(first)
            hit = []
          }
          return false
        })
      }
      console.log("this is the recent hit", recentHits)
    })
  })
})
