import axios from "axios"

// Set up initial state
const initialState = {
  user: null,
  totalTabs: [],
  searchVal: "",
  tempo: "",
  songName: "",
  albumName: "",
  description: "",
  uri: ""
}

// action types
const GET_USER_INFO = "GET_USER_INFO"
const GET_TABS = "GET_TABS"
const UPDATE_SEARCH_VAL = "UPDATE_SEARCH_VAL"
const SET_TEMPO = "SET_TEMPO"
const SONGNAME = "SONG_NAME"
const ALBUM_NAME = "ALBUM_NAME"
const DESCRIPTION = "DESCRIPTION"
const GET_URI = "GET_URI"
const DELETE_TAB = "DELETE_TAB"
const UPDATE_TAB = "UPDATE_TAB"
const GET_SONG = "GET_SONG"

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

export function updateTab(id) {
  console.log("this is the id im looking for", id)
  const updateTabs = axios.put(`/updateTabs/${id}`).then(res => {
    return res.data
  })
  return {
    type: UPDATE_TAB,
    payload: updateTabs
  }
}

export function getinfo(id) {
  const getSong = axios.get(`/song${id}`).then(res => {
    return res.data
  })
  return {
    type: GET_SONG,
    payload: getSong
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

export function deleteTab(id) {
  console.log("delete")
  console.log("delete", id)
  const deleteTab = axios.delete(`/deletetab/${id}`).then(res => {
    return res.data
  })
  return {
    type: DELETE_TAB,
    payload: deleteTab
  }
}

export function getSheetMusic(id) {
  const uri = axios.get(`/sheetMusic/${id}`).then(res => {
    return res.data
  })
  return {
    type: GET_URI,
    payload: uri
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

    case GET_URI + "_FULFILLED":
      return Object.assign({}, state, { uri: action.payload })

    case GET_TABS + "_FULFILLED":
      console.log(action.payload)
      return Object.assign({}, state, { totalTabs: action.payload })

    case DELETE_TAB + "_FULFILLED":
      return Object.assign({}, state, { totalTabs: action.payload })

    case UPDATE_TAB + "_FULFILLED":
      return Object.assign({}, state, { totalTabs: action.payload })

    case SET_TEMPO:
      console.log(action.payload)

      return Object.assign({}, state, { tempo: action.payload })

    default:
      return state
  }
}
