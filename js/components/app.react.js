import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {checkSession, login, getBoards, fetchPinsIfNeeded} from '../actions'

/* main react component, the only component with state */

class App extends Component{

  static displayName = 'App';

  constructor(props){
    super(props);
    this._dispatch = props.dispatch;
  }

  componentDidMount() {
    this._dispatch(checkSession());
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  onChange(){
//    let state = SettingsStore.getSettings();
//    this.setState(state);
  }

  render(){

    let loginButton
    let boardsButton

    if(typeof this.props.accessToken === 'undefined') {
      loginButton = (
        <button
          value={"login"}
          onClick={
            (e) => {
              this._dispatch(login());
            }
          }
        >{"login"}
        </button>
      )
    }else{
      boardsButton = (
        <button
          value={"getBoards"}
          onClick={
            (e) => {
              this._dispatch(getBoards());
            }
          }
        >{"get boards"}
        </button>
      )
    }

    return(
      <div>
        {loginButton}
        {boardsButton}
      </div>
    );
  }
}

App.propTypes = {};


const mapStateToProps = function(state){
  const {session, login} = state;
  console.log(state);
  return {
    accessToken: session.accessToken || login.accessToken
  }
};

const mapDispatchToProps = function(dispatch){

};

const app = connect(
  mapStateToProps
  //mapDispatchToProps
)(App);

export default app;
//export default App;
