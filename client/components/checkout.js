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
        <form>
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
        </form>
      </div>
    )
  }
}

//Display order summary and total (items, quantity, price, subtotal, total)

//Shipping Address
//Address Component -> takes props if user has address

//Billing Address
//Address Component -> takes props if user has address

//Credit Card Info

//Submit Button

const mapStateToProps = state => {
  return {
    billingAddress: state.billingAddress,
    shippingAddress: state.shippingAddress
  }
}

//mapDispatchToProps

const Checkout = connect(mapStateToProps)(DisconnectedCheckout)

export default Checkout
