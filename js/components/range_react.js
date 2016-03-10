import React, {PropTypes} from 'react'

let labelStyle = {
  // width: '140px',
  // height: '1.9em',
  // display: 'inline-block',
  // color: 'white'
}

let inputStyle = {
  // verticalAlign: 'middle',
  // //marginBottom: '5px',
  // width: '200px'
}

/* React wrapper for input type Range */

class Slider extends React.Component{

  static displayName = 'Slider'

  render(){
    let value = this.props.value
    function createLabel(props){
      let label = value
      if(props.label){
        label = props.label + '<em>' + value + '</em>'
      }
      return {__html: label}
    }
    return (
      <div>
        <label className={this.props.classLabel} htmlFor={this.props.id} style={labelStyle} dangerouslySetInnerHTML={createLabel(this.props)} />
        <input
          className={this.props.classRange}
          style={inputStyle}
          onMouseUp={this.props.onMouseUp}
          onMouseDown={this.props.onMouseDown}
          id={this.props.id}
          onChange={this.props.onChange}
          type="range"
          value={value}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
        />
      </div>
    )
  }
}

Slider.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number,
  value: PropTypes.number,
  classLabel: PropTypes.string,
  classRange: PropTypes.string
}

export default Slider
