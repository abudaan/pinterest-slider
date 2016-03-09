import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {checkSession, login, getPins} from '../actions/pinterest_actions'
import ImageSlider from '../containers/image_slider'
import SelectBoard from '../components/select_board'

/* main react component, the only component with state */

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
        div = (
          <button
            onClick={this.props.onAuthorize}
          >
            {"authorize"}
          </button>
        )
        break

      case 'boards':
        div = (
          <SelectBoard
            options={this.props.boards}
            onChange={this.props.onSelectBoard}
          />
        )
        break

      case 'images':
        div = (
          <ImageSlider
            images={this.props.images}
            index={this.props.imageIndex}
            interval={6000}
          />
        )
        break

      default:
        div = <div>{'...'}</div>
    }

    return div
  }
}

App.propTypes = {
  onSelectBoard: PropTypes.func.isRequired
}


const mapStateToProps = function(state, ownProps){
  const {session, boardsById, pinsById, slider} = state
  let boards = boardsById.boards
  let images = pinsById.images
  let accessToken = session.accessToken
  let displayState

  if(accessToken === false){
    displayState = 'authorize'
  }else if(typeof images !== 'undefined'){
    displayState = 'images'
  }else if(typeof boards !== 'undefined'){
    displayState = 'boards'
  }

  let imageIndex = slider.index

  return {
    displayState,
    boards,
    images,
    imageIndex
  }
}


const mapDispatchToProps = function(dispatch){
  return {
    onAuthorize: () => {
      dispatch(login())
    },
    onSelectBoard: (e) => {
      let options = e.target.options
      let optionId = options[e.target.selectedIndex].id
      if(optionId !== 'choose'){
        dispatch(getPins(optionId))
      }
    },
    dispatch
  }
}

const app = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default app
