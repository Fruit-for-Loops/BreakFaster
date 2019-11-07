import React from 'react'
import {connect} from 'react-redux'
import {addToCart} from '../store'

export const Breakfast = props => {
  console.log('BREAKFAST', props.breakfast)
  return (
    <div className="breakfastItem">
      <img src={props.breakfast.pictureUrl} />
      <p>{props.breakfast.name}</p>
      <p>{props.breakfast.description}</p>
      <p>
        ${
          (props.breakfast.price.toString().slice(0, 2) +
            '.' +
            props.breakfast.price.toString,
          slice(2))
        }
      </p>
      <button>Add to cart</button>
    </div>
  )
}

// const mapStateToProps = state => {
//   return {
//     user: state.user,
//     cart: state.cart
//   }
// }

// const mapDispatchToProps = dispatch => ({
//   addToCartThunk: (breakfastId) => dispatch(addToCart(breakfastId))
// })

// export default connect(null, mapDispatchToProps)(Breakfast)

export default Breakfast
