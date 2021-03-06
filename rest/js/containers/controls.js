import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {selectInterval, selectBoard, getPins} from '../actions/pinterest_actions'
import Range from '../components/range_react'

const mapStateToProps = function(state){
  const {data, slider} = state
  return {
    boards: data.boards,
    interval: slider.interval,
    selectedBoard: data.selectedBoard
  }
}

const mapDispatchToProps = function(dispatch){
  return {
    selectBoard: (e) => {
      let options = e.target.options
      let optionId = options[e.target.selectedIndex].id
      if(optionId !== 'choose'){
        dispatch(selectBoard(optionId))
      }else{
        dispatch(selectBoard())
      }
    },
    dispatch
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Controls extends Component{

  static displayName = 'Controls'

  constructor(props){
    super(props);
  }

  render(){

    let boards = this.props.boards;
    let options = [<option id={'choose'} key={'choose'}>{'choose a board'}</option>]
    boards.forEach(function(board){
      options.push(<option id={board.id} key={board.id}>{board.name}</option>)
    })

    return (
      <div>
        <select onChange={this.props.selectBoard}>
          {options}
        </select>

        <Range
          classLabel={'label-interval'}
          classRange={'range-interval'}
          label={'interval: '}
          min={2000}
          max={20000}
          step={5}
          value={this.props.interval}
          onChange={e => this.props.dispatch(selectInterval(e.target.valueAsNumber))}
        />

        <button
          disabled={typeof this.props.selectedBoard === 'undefined'}
          onClick={e => this.props.dispatch(getPins(this.props.selectedBoard))}
        >
          {'start'}
        </button>
      </div>
    )
  }
}

// .isRequired yields a warning because decorators aren't yet fully supported
Controls.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.object),
  interval: PropTypes.number,
  selectBoard: PropTypes.func,
  selectedBoard: PropTypes.string
}
