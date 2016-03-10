import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {login} from '../actions/pinterest_actions'

class Authorize extends Component{

  constructor(props){
    super(props)
  }

  render(){
    // if(this.props.displayState !== 'authorize'){
    //   return false
    // }

    return (
      <button onClick={() => this.props.dispatch(login())}>
        {"authorize"}
      </button>
    )
  }
}

Authorize.propTypes = {
  dispatch: PropTypes.func.isRequired
//  displayState: PropTypes.string.isRequired
}

const mapDispatchToProps = function(dispatch){
  return {
    dispatch
  }
}

export default connect(
  mapDispatchToProps
)(Authorize)
