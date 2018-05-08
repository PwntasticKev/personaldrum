import axios from "axios"

// Set up initial state
const initialState = {
  user: null,
  totalTabs: [],
  searchVal: "",
  tempo: "",
  songName: "",
  albumName: "",
  description: ""
}

// action types
const GET_USER_INFO = "GET_USER_INFO"
const GET_TABS = "GET_TABS"
const UPDATE_SEARCH_VAL = "UPDATE_SEARCH_VAL"
const SET_TEMPO = "SET_TEMPO"
const SONGNAME = "SONG_NAME"
const ALBUM_NAME = "ALBUM_NAME"
const DESCRIPTION = "DESCRIPTION"

// action creators
export function getUserInfo() {
  const userInfo = axios.get("/auth/me").then(res => {
    // console.log(res.data);

    return res.data
  })
  return {
    type: GET_USER_INFO,
    payload: userInfo
  }
}

export function getTabs(e) {
  let search = e ? `?search=${e}` : ""
  const tabs = axios.get(`/totaltabs${search}`).then(res => {
    return res.data
  })
  return {
    type: GET_TABS,
    payload: tabs
  }
}

export function setTempo(tempo) {
  return {
    type: SET_TEMPO,
    payload: tempo
  }
}

export function searchVal(val) {
  return {
    type: UPDATE_SEARCH_VAL,
    payload: val
  }
}

// reducer function
export default function reducer(state = initialState, action) {
  // console.log('this',action);
  switch (action.type) {
    case GET_USER_INFO + "_FULFILLED":
      return Object.assign({}, state, { user: action.payload })

    case GET_TABS + "_FULFILLED":
      console.log(action.payload)
      return Object.assign({}, state, { totalTabs: action.payload })

    case SET_TEMPO:
      console.log(action.payload)

      return Object.assign({}, state, { tempo: action.payload })

    default:
      return state
  }
}
