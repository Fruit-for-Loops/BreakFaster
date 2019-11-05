import React from 'react'

export const Breakfast = props => {
  return (
    <div id="breakfast">
      <img src={props.breakfast.pictureUrl} />
      <div id="breakfast-info">
        <p>Name: {props.breakfast.name}</p>
      </div>
    </div>
  )
}

// export default Breakfast
