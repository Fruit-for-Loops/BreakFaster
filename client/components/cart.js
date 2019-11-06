import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {getCart} from '../store/cart'
import {getSingleBreakfast} from '../store/breakfast'

const Cart = props => {
  console.log('PROPS', props)
  return (
    <div>
      <h1>Cart</h1>
      <div className="itemInCart">
        <p>item name</p>
        <p>quantity</p>
        <p>price</p>
      </div>
      <div className="itemInCart">
        <p>item name</p>
        <p>quantity</p>
        <p>price</p>
      </div>
      <div className="itemInCart">
        <p>item name</p>
        <p>quantity</p>
        <p>price</p>
        <button className="remove">Remove</button>
      </div>
      {/* {props.user.cart
        ? props.user.cart.items.map(item => {
            return (
              <div>
                <h1>Item name</h1>
              </div>
            )
          })
        : console.log('rendering')} */}
      <button className="checkoutBtn">Checkout</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => ({
  getSingleBreakfastThunk: () => dispatch(getSingleBreakfast()),
  getCartThunk: () => dispatch(getCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
// needs delete button
// needs to be able to change quantity
// checkout button
/* user logs in
check if they have a current cart. if so, display items. if not, blank.
*** So, component above will render IF user has a current cart. (or upon adding first item to cart)
user clicks 'add to cart'
if they have a current cart, send put request to add additional item to cart
if they do not have a current cart, send post request to cart table
user is not logged in:
check if cartid on session is null
if it's not null, display cart items
if it is null, blank
if they have a current cart, send put request to add additional item to cart
if they do not have a current cart, send post request to cart table, then add that instance's id to the cartid in the session
*/
