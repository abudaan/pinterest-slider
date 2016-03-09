import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {checkSession, login} from '../actions/pinterest_actions'
import ImageSlider from './image_slider'
import SelectBoard from './select_board'


class App extends Component{

  static displayName = 'App'

  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(checkSession())
  }

  render(){
    let div

    switch(this.props.displayState){
      case 'authorize':
        div =
          <button onClick={this.props.onAuthorize}>
            {"authorize"}
          </button>
        break

      case 'boards':
        div = <SelectBoard />
        break

      case 'images':
        div = <ImageSlider />
        break

      default:
        div = <div>{'...'}</div>
    }

    return div
  }
}


App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  displayState: PropTypes.string.isRequired,
  onAuthorize: PropTypes.func.isRequired
}


const mapStateToProps = function(state){
  const {boardsById, pinsById} = state
  let displayState = 'authorize'

  if(typeof pinsById.images !== 'undefined'){
    displayState = 'images'
  }else if(typeof boardsById.boards !== 'undefined'){
    displayState = 'boards'
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
