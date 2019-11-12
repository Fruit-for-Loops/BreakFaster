import React, {Component} from 'react'
import AddressInput from './address-input'
import Cart from './cart'
import {connect} from 'react-redux'
import {newPurchase, updateStock} from '../store/cart'
import ThankYou from './thankyou'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.makePurchase = this.makePurchase.bind(this)
  }

  makePurchase(cartId) {
    this.props.newPurchaseThunk(cartId)
    this.props.updateStockThunk()
    this.props.history.push('/thankyou')
  }

  render() {
    return (
      <div className="checkoutPage">
        <h1>Checkout</h1>
        <h2>Order Summary</h2>
        <Cart />
        <form>
          {/* Credit Card Info Stripe Component?*/}
          {/* It appears that with Express Stripe they enter their credit card info with Stripe */}
          <button
            type="submit"
            className="checkoutBtn"
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
    newPurchaseThunk: cartId => dispatch(newPurchase(cartId)),
    updateStockThunk: () => dispatch(updateStock())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
