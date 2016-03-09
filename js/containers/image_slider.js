import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {nextImage} from '../actions/pinterest_actions'
import Image from '../components/image'

class ImageSlider extends Component{

  static displayName = 'ImageSlider'

  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.props.dispatch(nextImage(this.props.index))
    }, this.props.interval)
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render(){
    return (
      <Image
        url={this.props.url}
        index={this.props.index}
        onClick={this.props.onClick}
      />
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  let image = ownProps.images[ownProps.index]
  return {
    url: image.url,
    index: ownProps.index,
    interval: ownProps.interval
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(nextImage(ownProps.index))
    },
    dispatch
  }
}


ImageSlider.propTypes = {
  interval: PropTypes.number.isRequired
}


ImageSlider = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageSlider)

export default ImageSlider
