const five = require('johnny-five')
let Board = new five.Board()

Board.on('ready', () => {
  let sensor = new five.Sensor('A0')
  const express = require('express')
  const http = require('http')
  const server = http.createServer()
  const _ = require('lodash')

  let io = require('socket.io')(server)
  let app = express()
  const port = 3005
  let hits = [];
  const connections = []
  const bodyParser = require('body-parser')
  app.use(bodyParser.json())
  

  io.on("connection", (socket) => {
    console.log("user has connected")
    sensor.on("change", _.debounce(() => {
      let val = sensor.scaleTo(0, 1000)
      if (val > 1) {
        hits.push("√ ")
        socket.emit("hit", hits)
        console.log(hits)
      } 
      // if (val > 5) {
      //   hits.push('V')
      // }
    }, 75))
  })

  
  server.listen(port, () => {
    console.log('listening on blah');
    
  })
  // app.get('/api/drum', (req, res) => {
  //   res.status(200).send(hits)
  // })

//   app.listen(port, () => {
//     console.log(`listening on port ${port}`)
//   })
})




// let io = socket(server)
//ideas tips
//start recording stop recording
// empty array

//sockets update live!


//   / Sortable.create(foo, {
//     animation: 300,
//     group: {
//       name: "hihat",
//       pull: "clone",
//       revertClone: true,
//     }
//   });


// Sortable.create(bar, {
//   animation: 200,
//   group: {
//     name: "snare",
//     pull: "clone",
//     revertClone: true,
//   },
//   sort: false
// });

// Sortable.create(qux, {
//   group: {
//     name: 'qux',
//     put: ['hihat']
//   },
//   animation: 100
// });

// Sortable.create(snare, {
//   group: {
//     name: 'snare',
//     put: ['snare']
//   },
//   animation: 100

//   < !DOCTYPE html >
//     <html>
//       <head>
//         <meta charset="utf-8">
//           <title>Sortable: `put: []` demo</title>

//           <!-- Sortable.js -->
//   <script src="//rubaxa.github.io/Sortable/Sortable.js"></script>

  
// </head>
//         <body>

//           <ul id="foo">
//             <div>Hi-Hat</div>
//             <li></li>
//             <li>x</li>
//             <li>x x</li>
//             <li>x x x</li>
//             <li>x x x x</li>
//           </ul>

//           <ul id="bar">
//             <div>Snare Drum</div>
//             <li>o</li>
//             <li>o o</li>
//             <li>o o o</li>
//             <li>o o o o</li>
//           </ul>

//           <ul id="qux">
//             <div>hihat Here</div>
//             <li></li>
//           </ul>


//           <ul id="snare">
//             <div>snare Here</div>
//             <li></li>
//           </ul>


//         </body>
// </html>


//css
// ul {
//   list - style: none;
//   padding: 0;
// }

// li {
//   background: #eee;
//   margin: 0px;
//   padding: 5px 1px;
//   display: inline - block;
//   background: salmon

// }

// .sortable - ghost {
//   opacity: .6;
// }