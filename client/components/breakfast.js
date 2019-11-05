import React from 'react'

const singleBreakfast = breakfast => {
  return (
    <div id="breakfast">
      <img src={breakfast.imageUrl} />
      <div id="breakfast-info">
        <p>Name: {breakfast.name}</p>
      </div>
    </div>
  )
}

export default singleBreakfast
