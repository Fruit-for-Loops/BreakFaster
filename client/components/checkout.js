import React, {Component} from 'react'
import AddressInput from './address-input'
import {connect} from 'react-redux'

class DisconnectedCheckout extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange() {}

  handleSubmit() {}

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        {/* Display order summary and total (items, quantity, price, subtotal, total) */}
        <form handleSubmit={() => this.handleSubmit(event)}>
          <label htmlFor="shipping-address">Shipping Address:</label>
          <AddressInput
            address={this.props.shippingAddress}
            handleChange={this.handleChange}
            type="shipping"
          />
          <label htmlFor="billing-address">Billing Address:</label>
          <AddressInput
            address={this.props.billingAddress}
            handleChange={this.handleChange}
            type="billing"
          />
          {/* Credit Card Info */}
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    billingAddress: state.billingAddress,
    shippingAddress: state.shippingAddress
  }
}

//mapDispatchToProps

const Checkout = connect(mapStateToProps)(DisconnectedCheckout)

export default Checkout
