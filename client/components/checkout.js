import React, {Component} from 'react'
import AddressInput from './address-input'
import {createOrder} from '../store/order'
import Cart from './cart'
import {connect} from 'react-redux'
import {newPurchase, updateStock} from '../store/cart'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.makePurchase = this.makePurchase.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  makePurchase(cartId) {
    this.props.newPurchaseThunk(cartId)
    this.props.updateStockThunk()
  }

  // handleSubmit(event) {
  //   event.preventDefault()
  //   this.props.createOrder(order)
  //   console.log('submit')
  // }

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <h2>Order Summary</h2>
        <Cart />
        {/* Display order summary and total (items, quantity, price, subtotal, total) */}
        {/* <form onSubmit={() => this.handleSubmit(event)}> */}
        <form>
          {/* Credit Card Info Stripe Component?*/}
          {/* It appears that with Express Stripe they enter their credit card info with Stripe */}
          <button
            type="submit"
            onClick={() => this.makePurchase(this.props.cartId)}
          >
            Checkout
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cartId: ownProps.match.params.cartId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createOrder: order => dispatch(createOrder(order)),
    newPurchaseThunk: cartId => dispatch(newPurchase(cartId)),
    updateStockThunk: () => dispatch(updateStock())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
