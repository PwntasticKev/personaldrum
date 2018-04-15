const five = require('johnny-five')
let Board = new five.Board()

Board.on('ready', () => {
  let sensor = new five.Sensor('A0')
  const express = require('express')
  let socket = require('socket.io')
  let app = express()
  const port = 3005
  let hits = [];
  const connections = []
  const bodyParser = require('body-parser')
  app.use(bodyParser.json())
  let io = socket()

  //socket stuff
  //socket stuff
  io.on("connection", (socket) => {
    console.log("user has connected")
  })


  sensor.on('change', () => {
    let val = sensor.scaleTo(0, 1000);
    if (hits.length < 10) {
      if (val > 1) {
        hits.push('hit')
        console.log(hits)
      }
    }
  })
  app.get('/api/drum', (req, res) => {
    res.status(200).send(hits)
  })

  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
})



// let io = socket(server)
//ideas tips
//start recording stop recording
// empty array

//sockets update live!