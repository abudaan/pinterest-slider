import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {checkSession} from '../actions/pinterest_actions'
import Authorize from '../containers/authorize'
import Controls from '../containers/controls'
import ImageSlider from '../containers/image_slider'


class App extends Component{

  static displayName = 'App'

  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(checkSession())
  }

  render(){
    return (
      <div>
        <Authorize displayState={this.props.displayState}/>
        <Controls displayState={this.props.displayState}/>
        <ImageSlider displayState={this.props.displayState}/>
      </div>
    )
  }
}

App.propTypes = {
  displayState: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const {session, pinsById} = state
  let {displayState = ''} = session
  return {
    displayState
  }
}

const mapDispatchToProps = function(dispatch){
  return {
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
