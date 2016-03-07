import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {checkSession, login, getBoards, getPins} from '../actions/pinterest_actions'

/* main react component, the only component with state */

class App extends Component{

  static displayName = 'App';

  constructor(props){
    super(props);
    //this._dispatch = props.dispatch;
  }

  componentDidMount() {
    this.props.dispatch(checkSession());
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
    let boardsMenu

    if(typeof this.props.boardsById === 'undefined') {
      loginButton = (
        <button
          value={"authorize"}
          onClick={
            (e) => {
              this._dispatch(login());
            }
          }
        >{"authorize"}
        </button>
      )
    }else{
      let boards = this.props.boardsById
      let options = []
      for(let id of Object.keys(boards)){
        let b = boards[id]
        options.push(<option id={id} key={id}>{b.name}</option>)
      }
      boardsMenu = (
        <select
          onChange={this.props.onSelectBoard}
        >
          {options}
        </select>
      )
    }

    return(
      <div>
        {loginButton}
        {boardsMenu}
      </div>
    );
  }
}

App.propTypes = {};


const mapStateToProps = function(state){
  const {boardsById} = state;
  console.log(state);
  return {
    boardsById: boardsById.boards
  }
};

const mapDispatchToProps = function(dispatch, ownProps){
  return {
    onSelectBoard: (e) => {
      let options = e.target.options
      let optionId = options[e.target.selectedIndex].id
      dispatch(getPins(optionId))
    },
    dispatch
  }
};

const app = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default app;
//export default App;
