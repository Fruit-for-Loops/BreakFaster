import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import ItemInCart from './itemInCart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.routeToCheckout = this.routeToCheckout.bind(this)
    this.findTotal = this.findTotal.bind(this)
  }

  findTotal(cart) {
    let sum = 0
    cart.forEach(item => {
      sum += item.price * item.cartItem.quantity
    })
    return sum
  }

  routeToCheckout(myCart) {
    this.props.history.push(`/checkout/${myCart[0].cartItem.cartId}`)
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
        {this.props.location.pathname.includes('/checkout') || (
          <button
            type="button"
            className="checkoutBtn"
            onClick={() => this.routeToCheckout(myCart)}
          >
            Checkout
          </button>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

export default withRouter(connect(mapStateToProps)(Cart))
