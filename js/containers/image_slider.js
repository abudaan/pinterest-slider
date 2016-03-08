import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {nextImage} from '../actions/pinterest_actions'
import Image from '../components/image'

const interval = 3000;

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

  _calculateSize(){

  }

  render(){
    return (
      <Image
        url={this.props.url}
        width={this.props.width}
        height={this.props.height}
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
    width: (image.width / 10) + 'px',
    height: (image.height / 10) + 'px',
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
