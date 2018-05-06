const five = require("johnny-five")
const Board = new five.Board()
const play = require("play")

Board.on("ready", () => {
  const sensor = new five.Sensor({
    pin: "A0",
    freq: 20
  })
  sensor.on("change", () => {
    const value = sensor.value
    if (sensor.value > 1) {
      play.sound("./snare.mp3")
      console.log(sensor.value)
    }
  })
})

/**
 * Setup a color mapping on the frontend that maps value ranges to a color
 * Turn on and off listening on the sensor
 * On every hit you need to save the time the hit occurs, and the value so you can display a color mapped to the value
 * Save this array to your database ^ When done recording (listening stopped)
 * get a list of "recordings"
 * in order to make recordings time sensative. you have 2 values x and y.
 * display color for x and wait the time distance between x and y to display color for y
 * delete a recording
 * update user information
 * create user
 * 2 tables user recordings
 * recordings: value time
 * get current user join recordings
 */
