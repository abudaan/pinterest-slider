import * as actions from '../constants/action_types'
import pdk from '../util/pdk_wrapper'


function _receiveBoards(json){
  let boards = {}

  json.map(function(b){
    boards[b.id] = b
  })

  return {
    type: actions.RECEIVE_BOARDS,
    boards
  }
}

function _receivePins(json){
  let pins = {}
  let images = []

  json.map(function(p){
    pins[p.id] = p
    images.push(p.image.original)
  })

  return {
    type: actions.RECEIVE_PINS,
    pins,
    images,
    numImages: images.length
  }
}

export function checkSession(){
  let accessToken = pdk.accessToken
  if(accessToken !== false){
    return dispatch => {
      dispatch({
        type: actions.GET_BOARDS,
        accessToken
      })
      return pdk.getBoards()
        .then(e => dispatch(_receiveBoards(e)))
    }
  }

  return {
    type: actions.CHECK_SESSION,
    accessToken
  }
}

export function login(){
  return dispatch => {
    // dispatch({
    //   type: actions.LOGIN
    // })
    return pdk.login()
      .then(() => {
        dispatch({
          type: actions.LOGGED_IN,
          accessToken: pdk.getAccessToken()
        })
        pdk.getBoards()
          .then((e) => dispatch(_receiveBoards(e)))
      })
  }
}

export function getPins(boardId) {
  return dispatch => {
    // dispatch({
    //   type: actions.GET_PINS
    // })
    return pdk.getPins(boardId)
      .then(e => dispatch(_receivePins(e)))
  }
}


export function nextImage(oldIndex){
  return (dispatch, getState) => {
    let index = oldIndex + 1
    let max = getState().pinsById.numImages
    if(index === max){
      index = 0
    }
    dispatch({
      type: actions.NEXT_IMAGE,
      index
    })
  }
}
