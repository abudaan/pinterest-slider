import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {login} from '../actions/pinterest_actions'

class Authorize extends Component{

  static displayName = 'Authorize';

  constructor(props){
    super(props)
  }

  render(){
    return (
      <button onClick={() => this.props.dispatch(login())}>
        {"authorize"}
      </button>
    )
  }
}

Authorize.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapDispatchToProps = function(dispatch){
  return {
    dispatch
  }
}

export default connect(
  mapDispatchToProps
)(Authorize)
