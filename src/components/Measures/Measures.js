import React, { Component } from "react"
import twosnare from "../notesimg/2snare.svg"
import one from "../notesimg/juansnare.svg"
import three from "../notesimg/2snare.svg"
import two from "../notesimg/3snare.svg"
import four from "../notesimg/4snare.svg"
import fasttwo from "../notesimg/quickdouble.svg"

export default class Measures extends Component {
  constructor() {
    super()
    this.state = {
      note1: [],
      note2: [],
      note3: [],
      note4: []
    }
  }

  filterNoteCase(note) {
    console.log(note)
    let passArr = [...note]
    let str = passArr.join(" ")

    switch (str) {
      case "0 0 0 1":
        console.log("this is not default")
        return (
          <div>
            <div>
              <img src={one} />>
            </div>
          </div>
        )
        break
      case "0 0 1 0":
        console.log("this is not default")
        return (
          <div>
            <div>
              <img src={one} />
            </div>
          </div>
        )
        break
      case "0 0 1 1":
        console.log("this is not default")
        return (
          <div>
            <img src={fasttwo} />
          </div>
        )
        break
      case "0 1 0 0":
        console.log("this is not default")
        return (
          <div>
            <div>
              <img src={one} />
            </div>
          </div>
        )
        break
      case "0 1 0 1":
        console.log("this is not default")
        return (
          <div>
            <div>
              <img src={two} />
            </div>
          </div>
        )
        break
      case "0 1 1 0":
        console.log("this is not default")
        return (
          <div>
            <img src={fasttwo} />
          </div>
        )
        break
      case "0 1 1 1":
        console.log("this is not default")
        return (
          <div>
            <img src={three} />
          </div>
        )
        break
      case "1 0 0 0":
        console.log("this is not default")
        return (
          <div>
            <div>
              <img src={one} />
            </div>
          </div>
        )
        break
      case "1 0 0 1":
        console.log("this is not default")
        return (
          <div>
            <div>
              <img src={one} />
            </div>
            <div>
              <img src={one} />
            </div>
          </div>
        )
        break
      case "1 0 1 0":
        console.log("this is not default")
        return (
          <div>
            <div className="note">
              <img src={two} />
            </div>
          </div>
        )
        break
      case "1 0 1 1":
        console.log("this is not default")
        return (
          <div>
            <img src={three} />
          </div>
        )
        break
      case "1 1 0 0":
        console.log("this is not default")
        return (
          <div>
            <img src={three} />
          </div>
        )
        break
      case "1 1 0 1":
        console.log("this is not default")
        return (
          <div>
            <img src={three} />
          </div>
        )
        break
      case "1 1 1 0":
        console.log("this is not default")
        return (
          <div>
            <img src={three} />
          </div>
        )
        break
      case "1 1 1 1":
        console.log("this is not default")
        return (
          <div>
            <img src={four} />
          </div>
        )
        break
      default:
        console.log("this is default", passArr)
        return <div> 'helo' </div>
    }
  }
  render() {
    return (
      <div>
        <div className="measure">
          <div>{this.filterNoteCase(this.props.note0)}</div>
          <div>{this.filterNoteCase(this.props.note1)}</div>
          <div>{this.filterNoteCase(this.props.note2)}</div>
          <div>{this.filterNoteCase(this.props.note3)}</div>
          {/* <div>{this.filterNoteCase(this.props.note0)}</div>
          <div>{this.filterNoteCase(this.props.note1)}</div>
          <div>{this.filterNoteCase(this.props.note2)}</div>
          <div>{this.filterNoteCase(this.props.note3)}</div> */}
          {/* <div>{this.props.note2[0]}</div>
          <div>{this.props.note2[1]}</div>
          <div>{this.props.note2[2]}</div>
          <div>{this.props.note2[3]}</div>
          <div>{this.props.note3[0]}</div>
          <div>{this.props.note3[1]}</div>
          <div>{this.props.note3[2]}</div>
          <div>{this.props.note3[3]}</div> */}
        </div>
      </div>
    )
  }
}
