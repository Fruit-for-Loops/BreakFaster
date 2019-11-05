import React, {Component} from 'react'
import AddressInput from './address-input'
import {connect} from 'react-redux'

class DisconnectedCheckout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: {},
      billingName: this.props.billingAddress.name,
      billingStreet: this.props.billingAddress.street,
      billingCity: this.props.billingAddress.city,
      billingState: this.props.billingAddress.state,
      billingZip: this.props.billingAddress.zip,
      shippingName: this.props.shippingAddress.name,
      shippingStreet: this.props.shippingAddress.street,
      shippingCity: this.props.shippingAddress.city,
      shippingState: this.props.shippingAddress.state,
      shippingZip: this.props.shippingAddress.zip
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSameAddressSelect = this.handleSameAddressSelect.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSameAddressSelect(event) {
    let billingAddressForm = document.getElementById('billing')
    billingAddressForm.classList.toggle('disabled')
    if (event.target.checked) {
      this.setState({
        billingName: this.shippingName,
        billingStreet: this.shippingStreet,
        billingCity: this.shippingCity,
        billingState: this.shippingState,
        shippingZip: this.shippingZip
      })
    }
  }

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
            id="shipping"
          />
          <input
            type="radio"
            value="Billing Address is Same as Shipping Address"
            handleChange={this.handleSameAddressSelect}
          />
          <label htmlFor="billing-address">Billing Address:</label>
          <AddressInput
            address={this.props.billingAddress}
            handleChange={this.handleChange}
            id="billing"
          />
          {/* Credit Card Info Stripe Component?*/}
          {/* It appears that with Express Stripe they enter their credit card info with Stripe */}
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
