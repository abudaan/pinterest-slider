import { combineReducers } from 'redux';
import * as actions from '../constants/action_types';


function session(state = {}, action){
  let accessToken;
  if(action.session){
    accessToken = action.session.accessToken;
  }
  switch (action.type) {
    case actions.CHECK_SESSION:
      return Object.assign({}, state, {
        accessToken
      });
    default:
      return state;
  }
}

function login(state = {}, action){
  switch (action.type) {
    case actions.LOGGED_IN:
      return Object.assign({}, state, {
        accessToken: action.accessToken
      });
    default:
      return state;
  }
}

function selectedBoard(state = 'other', action) {
  switch (action.type) {
    case actions.SELECT_BOARD:
      return action.board;
    default:
      return state;
  }
}


function boardsById(state = {}, action) {
  switch(action.type){
    case actions.RECEIVE_BOARDS:
      return Object.assign({}, state, action.boards)
    default:
      return state
  }
}


function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case actions.INVALIDATE_BOARD:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case actions.REQUEST_PINS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case actions.RECEIVE_PINS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function postsByBoard(state = { }, action) {
  switch (action.type) {
    case actions.INVALIDATE_BOARD:
    case actions.RECEIVE_PINS:
    case actions.REQUEST_PINS:
      return Object.assign({}, state, {
        [action.BOARD]: posts(state[action.board], action)
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  session,
  login,
  boardsById,
  postsByBoard,
  selectedBoard
})

export default rootReducer;
