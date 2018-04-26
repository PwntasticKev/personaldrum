import axios from "axios"

// Set up initial state
const initialState = {
  user: null,
  totalTabs: [],
  searchVal: '',
}

// action types
const GET_USER_INFO = "GET_USER_INFO"
const GET_TABS = 'GET_TABS'
const UPDATE_SEARCH_VAL = "UPDATE_SEARCH_VAL"

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
  const tabs = axios.get(`/totaltabs/${e}`).then(res => {
    return res.data
  })
  return {
    type: GET_TABS,
    payload: tabs
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
    console.log(action.payload);
    
    return Object.assign({}, state, { totalTabs: action.payload })
    default:
      return state
  }
}
