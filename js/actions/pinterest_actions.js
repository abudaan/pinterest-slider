import * as actions from '../constants/action_types'
import pdk from '../pdk_wrapper'


function _receiveBoards(json){
  let boards = {}

  json.map(function(b){
    boards[b.id] = b;
  });

  return {
    type: actions.RECEIVE_BOARDS,
    boards
  }
}

function _receivePins(json){
  let pins = {}

  json.map(function(p){
    pins[p.id] = p;
  });

  return {
    type: actions.RECEIVE_PINS,
    pins
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
      });
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


/*
function requestPins(board) {
  return {
    type: REQUEST_PINS,
    board
  }
}

function receivePins(board, json) {
  console.log(json)
  return {
    type: RECEIVE_PINS,
    board,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export function fetchPinsIfNeeded(board) {
  return (dispatch, getState) => {
    //if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPins(board))
    //}
  }
}
*/
/*
function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}
*/
