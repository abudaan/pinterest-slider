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

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render(){
    let image = this.props.images[this.props.index]
    return (
      <Image
        url={image.url}
        index={this.props.index}
        onClick={this.props.onClick}
      />
    )
  }
}


const mapStateToProps = (state) => {
  const {data, slider} = state

  return {
    images: data.images,
    index: slider.index,
    interval: slider.interval
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
  dispatch: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
  interval: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageSlider)
