import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {nextImage, resize} from '../actions/pinterest_actions'
import Image from '../components/image'

class ImageSlider extends Component{

  static displayName = 'ImageSlider'

  constructor(props){
    super(props)
    this.resizeHandler = this._handleResize.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler)
    this.resizeHandler()
    this.timer = setInterval(() => {
      this.props.dispatch(nextImage(this.props.index))
    }, this.props.interval)
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler)
    clearInterval(this.timer)
  }

  _calculateSize(){
    let width = this.props.width + 'px'
    let height = this.props.height + 'px'

    return{
      width,
      height
    }
  }

  _handleResize(){
    this.props.dispatch(resize(window.innerWidth, window.innerHeight))
  }

  render(){
    let size = this._calculateSize()
    return (
      <Image
        url={this.props.url}
        width={size.width}
        height={size.height}
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
    imageWidth: image.width,
    imageHeight: image.height,
    index: ownProps.index,
    interval: ownProps.interval,
    width: state.slider.width,
    height: state.slider.height
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
