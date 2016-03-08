import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {checkSession, login, getPins} from '../actions/pinterest_actions'

/* main react component, the only component with state */

class App extends Component{

  static displayName = 'App'

  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(checkSession())
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  render(){

    let loginButton
    let boardsMenu
    let boards = this.props.boardsById

    if(this.props.accessToken === false) {
      loginButton = (
        <button
          value={"authorize"}
          onClick={
            (e) => {
              this.props.dispatch(login())
            }
          }
        >{"authorize"}
        </button>
      )
    }else if(typeof boards !== 'undefined'){
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
    )
  }
}

App.propTypes = {}


const mapStateToProps = function(state){
  const {boardsById, session} = state
  return {
    accessToken: session.accessToken,
    boardsById: boardsById.boards
  }
}


const mapDispatchToProps = function(dispatch, ownProps){
  return {
    onSelectBoard: (e) => {
      let options = e.target.options
      let optionId = options[e.target.selectedIndex].id
      dispatch(getPins(optionId))
    },
    dispatch
  }
}

const app = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default app
