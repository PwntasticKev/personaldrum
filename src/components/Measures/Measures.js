import React, { Component } from "react"
import one from "../notesimg/juansnare.svg"
import three from "../notesimg/2snare.svg"
import two from "../notesimg/double.svg"
import four from "../notesimg/4snare.svg"
import "./Measures.css"

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
    // console.log(note)
    let passArr = [...note]
    let str = passArr.join(" ")

    switch (str) {
      case "0 0 0 1":
        return (
          <div className="noteone">
            <img src={one} alt="" />
          </div>
        )
      case "0 0 1 0":
        return (
          <div className="noteone">
            <img src={one} alt="" />
          </div>
        )

      case "0 0 1 1":
        return (
          <div className="notetwo">
            <img src={two} alt="" />
          </div>
        )

      case "0 1 0 0":
        return (
          <div className="noteone">
            <img src={one} alt="" />
          </div>
        )

      case "0 1 0 1":
        return (
          <div className="notetwo">
            <img src={two} alt="" />
          </div>
        )

      case "0 1 1 0":
        return (
          <div className="notetwo">
            <img src={two} alt="" />
          </div>
        )

      case "0 1 1 1":
        return (
          <div className="notethree">
            <img src={three} alt="" />
          </div>
        )

      case "1 0 0 0":
        return (
          <div className="noteone">
            <img src={one} alt="" />
          </div>
        )

      case "1 0 0 1":
        return (
          <div className="noteone">
            <img src={one} alt="" />
          </div>
        )

      case "1 0 1 0":
        return (
          <div className="notetwo">
            <img src={two} alt="" />
          </div>
        )

      case "1 0 1 1":
        return (
          <div className="notethree">
            <img src={three} alt="" />
          </div>
        )

      case "1 1 0 0":
        return (
          <div className="notethree">
            <img src={three} alt="" />
          </div>
        )

      case "1 1 0 1":
        return (
          <div className="notethree">
            <img src={three} alt="" />
          </div>
        )

      case "1 1 1 0":
        return (
          <div className="notethree">
            <img src={three} alt="" />
          </div>
        )

      case "1 1 1 1":
        return (
          <div className="notefour">
            <img src={four} alt="" />
          </div>
        )

      default:
        return <div className="" />
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
        </div>
      </div>
    )
  }
}
