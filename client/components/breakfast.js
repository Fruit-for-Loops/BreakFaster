import React from 'react'

export const Breakfast = props => {
  return (
    <div id="breakfastItem">
      <img src={props.breakfast.pictureUrl} />
      <p>{props.breakfast.name}</p>
      <p>${props.breakfast.price}</p>
      <button>Add to cart</button>
    </div>
  )
}

// export default Breakfast
