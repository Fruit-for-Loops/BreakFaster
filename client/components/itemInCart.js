import React from 'react'
import {connect} from 'react-redux'
import {
  removeItemFromCart,
  increaseQuantity,
  decreaseQuantity
} from '../store/cart'

class ItemInCart extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDecrease = this.handleDecrease.bind(this)
    this.handleIncrease = this.handleIncrease.bind(this)
  }

  handleDelete() {
    this.props.removeItemThunk(this.props.item)
  }

  handleDecrease = () => {
    this.props.decreaseQuantityThunk(this.props.item)
  }

  handleIncrease = () => {
    this.props.increaseQuantityThunk(this.props.item)
  }

  render() {
    const item = this.props.item
    const disabledDecrease = item.cartItem.quantity === 0
    return (
      <tr>
        <td>{item.name}</td>
        <td>${(item.price / 100).toFixed(2)}</td>
        <td>
          <button
            type="button"
            disabled={disabledDecrease}
            onClick={this.handleDecrease}
          >
            -
          </button>
        </td>
        <td>{item.cartItem.quantity}</td>
        <td>
          <button type="button" onClick={this.handleIncrease}>
            +
          </button>
        </td>
        <td>
          <button type="button" onClick={this.handleDelete}>
            X
          </button>
        </td>
      </tr>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  increaseQuantityThunk: breakfast => dispatch(increaseQuantity(breakfast)),
  decreaseQuantityThunk: breakfast => dispatch(decreaseQuantity(breakfast)),
  removeItemThunk: breakfast => dispatch(removeItemFromCart(breakfast))
})

export default connect(null, mapDispatchToProps)(ItemInCart)
