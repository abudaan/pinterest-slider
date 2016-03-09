import React, {PropTypes} from 'react'

const SelectBoard = ({options, onChange}) => {

  let elements = [<option id={'choose'} key={'choose'}>{'choose a board'}</option>]
  for(let id of Object.keys(options)){
    let b = options[id]
    elements.push(<option id={id} key={id}>{b.name}</option>)
  }

  return (
    <select onChange={onChange}>
      {elements}
    </select>
  )
}

SelectBoard.propTypes = {
  options: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SelectBoard
