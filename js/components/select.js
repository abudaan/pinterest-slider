        // let options = [<option id={'choose'} key={'choose'}>{'choose a board'}</option>]
        // for(let id of Object.keys(boards)){
        //   let b = boards[id]
        //   options.push(<option id={id} key={id}>{b.name}</option>)
        // }
        // div = (
        //   <select onChange={this.props.onSelectBoard}>
        //     {options}
        //   </select>
        // )



import React, {PropTypes} from 'react'
const ReactCSSTransitionGroup = require('react-addons-css-transition-group')

const Image = ({url, index, width, height, onClick }) => {
  return (
    <ReactCSSTransitionGroup
      transitionName={'image'}
      transitionAppear={true}
      transitionAppearTimeout={1000}
      transitionEnterTimeout={1000}
      transitionLeaveTimeout={1000}
    >
      <img
        src={url}
        key={'image_' + index}
        onClick={e => {
          e.preventDefault()
          onClick()
        }}
      />
    </ReactCSSTransitionGroup>
  )
}


Image.propTypes = {
  url: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Image
