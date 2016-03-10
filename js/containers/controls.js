import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {selectInterval, selectBoard, getPins} from '../actions/pinterest_actions'
import Range from '../components/range_react'

class Controls extends Component{

  constructor(props){
    super(props);
  }

  render(){
    let boards = this.props.boards;
    let options = [<option id={'choose'} key={'choose'}>{'choose a board'}</option>]
    for(let id of Object.keys(boards)){
      let b = boards[id]
      options.push(<option id={id} key={id}>{b.name}</option>)
    }

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
          onChange={e => dispatch(selectInterval(e.target.valueAsNumber))}
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


Controls.propTypes = {
  selectBoard: PropTypes.func.isRequired,
  boards: PropTypes.object.isRequired,
  selectedBoard: PropTypes.string
}


const mapStateToProps = function(state){
  const {boardsById, slider} = state
  return {
    boards: boardsById.boards,
    interval: slider.interval,
    selectedBoard: boardsById.selectedBoard
  }
}


const mapDispatchToProps = function(dispatch, ownProps){
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls)
