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
    // this.timer = setInterval(() => {
    //   this.props.dispatch(nextImage(this.props.index))
    // }, this.props.interval)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.displayState === 'run'){
      this.timer = setInterval(() => {
        this.props.dispatch(nextImage(this.props.index))
      }, this.props.interval)
    }
  }

  render(){
    if(this.props.displayState !== 'run'){
      return false
    }

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


const mapStateToProps = (state, ownProps) => {
  const {pinsById, slider} = state

  return {
    displayState: ownProps.displayState,
    images: pinsById.images || null,
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
  displayState: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  interval: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageSlider)
