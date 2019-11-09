import React from 'react'
import {connect} from 'react-redux'
import {
  getCart,
  removeItemFromCart,
  increaseQuantity,
  decreaseQuantity
} from '../store/cart'
import {getSingleBreakfast} from '../store/breakfast'
import ItemInCart from './itemInCart'

class Cart extends React.Component {
  findTotal(cart) {
    let sum = 0
    cart.forEach(item => {
      sum += item.price * item.cartItem.quantity
    })
    return sum
  }

  render() {
    const myCart = this.props.cart.cart
    const total = this.findTotal(myCart)

    return (
      <div>
        <h1>Cart</h1>
        <div className="itemInCart">
          <table>
            {myCart.map(item => {
              return <ItemInCart item={item} />
            })}
          </table>
        </div>
        Total: ${(total / 100).toFixed(2)}
        <button className="checkoutBtn">Checkout</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => ({
  getSingleBreakfastThunk: () => dispatch(getSingleBreakfast()),
  getCartThunk: () => dispatch(getCart()),
  increaseQuantityThunk: breakfast => dispatch(increaseQuantity(breakfast)),
  decreaseQuantityThunk: breakfast => dispatch(decreaseQuantity(breakfast)),
  removeItemThunk: breakfast => dispatch(removeItemFromCart(breakfast))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
