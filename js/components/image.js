import React, { PropTypes } from 'react'

const Image = ({url, index, width, height, onClick }) => {

  return (
    <img
      src={url}
      width={width}
      height={height}
      key={index}
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
    </img>
  )
}

Image.propTypes = {
  url: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Image
