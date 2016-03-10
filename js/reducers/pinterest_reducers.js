import { combineReducers } from 'redux'
import * as actions from '../constants/action_types'


function session(state = {}, action){
  let accessToken = action.accessToken
  switch (action.type) {
    case actions.CHECK_SESSION:
      return Object.assign({}, state, {
        accessToken
      })
    case actions.LOGGED_IN:
      return Object.assign({}, state, {
        accessToken
      })
    case actions.GET_BOARDS:
      return Object.assign({}, state, {
        accessToken
      })
    default:
      return state
  }
}

function boardsById(state = {}, action) {
  switch(action.type){
    case actions.RECEIVE_BOARDS:
      return Object.assign({}, state, {
        boards: action.boards
      })
    case actions.SELECT_BOARD:
      return Object.assign({}, state, {
        selectedBoard: action.board
      })
    default:
      return state
  }
}

function pinsById(state = {}, action) {
  switch(action.type){
    case actions.RECEIVE_PINS:
      return Object.assign({}, state, {
        pins: action.pins,
        images: action.images,
        numImages: action.numImages
      })
    default:
      return state
  }
}

function slider(state = {index: 0, interval: 6000}, action){
  switch(action.type){
    case actions.NEXT_IMAGE:
      return Object.assign({}, state, {index: action.index})
    case actions.SELECT_INTERVAL:
      return Object.assign({}, state, {interval: action.interval})
    default:
      return state
  }
}

const rootReducer = combineReducers({
  session,
  boardsById,
  pinsById,
  slider
})

export default rootReducer
