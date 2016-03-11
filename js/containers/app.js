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
    switch(this.props.displayState){
      case 'authorize':
        return <Authorize/>
      case 'configure':
        return <Controls/>
      case 'run':
        return <ImageSlider/>
      case 'loading':
        return <div className={'loading'}>{'loading'}</div>;
      default:
        return false
    }
    // return (
    //   <div>
    //     <Authorize displayState={this.props.displayState}/>
    //     <Controls displayState={this.props.displayState}/>
    //     <ImageSlider displayState={this.props.displayState}/>
    //   </div>
    // )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  displayState: PropTypes.string
}

const mapStateToProps = (state) => {
  const {session} = state
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
