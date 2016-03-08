import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {checkSession, login, getPins} from '../actions/pinterest_actions'
import ImageSlider from '../containers/image_slider'

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

    let div
    let boards = this.props.boards
    let images = this.props.images

    switch(this.props.displayState){
      case 'authorize':
        div = (
          <button
            onClick={
              () => {
                this.props.dispatch(login())
              }
            }
          >{"authorize"}
          </button>
        )
        break

      case 'boards':
        let options = []
        for(let id of Object.keys(boards)){
          let b = boards[id]
          options.push(<option id={id} key={id}>{b.name}</option>)
        }
        div = (
          <select onChange={this.props.onSelectBoard}>
            {options}
          </select>
        )
        break

      case 'images':
        //div = <img src={images[this.props.imageIndex].url} id={this.props.imageIndex} onClick={this.props.onImageClick}/>
        div = (
          <ImageSlider
            images={this.props.images}
            index={this.props.imageIndex}
            interval={3000}
          />
        )
        break

      default:
        div = <div>{'...'}</div>
    }

    return(
      <div>
        {div}
      </div>
    )
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


const mapDispatchToProps = function(dispatch, ownProps){
  const index = ownProps.imageIndex;
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
