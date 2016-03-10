import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {checkSession, login} from '../actions/pinterest_actions'
import ImageSlider from './image_slider'
import Controls from './controls'


class App extends Component{

  static displayName = 'App'

  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(checkSession())
  }

  render(){
    switch(this.props.displayState){
      case 'authorize':
        return (
          <button onClick={this.props.onAuthorize}>
            {"authorize"}
          </button>
        )

      case 'configure':
        return <Controls />

      case 'run':
        return <ImageSlider />

      default:
        return <div>{'...'}</div>
    }
  }
}


App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  displayState: PropTypes.string.isRequired,
  onAuthorize: PropTypes.func.isRequired
}


const mapStateToProps = function(state){
  const {session, boardsById, pinsById} = state
  let displayState = ''

  if(session.accessToken === false){
    displayState = 'authorize'
  }else if(typeof pinsById.images !== 'undefined'){
    displayState = 'run'
  }else if(typeof boardsById.boards !== 'undefined'){
    displayState = 'configure'
  }

  return {
    displayState
  }
}


const mapDispatchToProps = function(dispatch){
  return {
    onAuthorize: () => {
      dispatch(login())
    },
    dispatch
  }
}


const app = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default app
