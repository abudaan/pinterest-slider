import * as actions from '../constants/action_types'
import fetch from 'isomorphic-fetch'

const PDK = window.PDK // ugly!

function _login(){
  return new Promise(function (resolve, reject){
    let session = PDK.getSession()
    if(!session){
      PDK.login({scope: 'read_public'}, function(e){
        resolve(e)
      })
    }else{
      resolve(session)
    }
  })
}


function _getBoards() {
  return new Promise(function(resolve, reject){
    PDK.me('boards', function (response) {
      if (!response || response.error) {
        reject(response)
      } else {
        resolve(response.data)
      }
    })
  })
}


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


export function checkSession(){
  return {
    type: actions.CHECK_SESSION,
    session: PDK.getSession()
  }
}


export function login(){
  return (dispatch, getState) => {
    dispatch({
      type: actions.LOGIN
    })
    return _login()
      .then(() => dispatch({
        type: actions.LOGGED_IN,
        accessToken: PDK.getSession().accessToken
      }))
  }
}


export function getBoards() {
  return dispatch => {
    dispatch({
      type: actions.GET_BOARDS
    })
    return _getBoards()
      .then(e => dispatch(_receiveBoards(e)))
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
