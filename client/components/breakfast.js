import React from 'react'
import {connect} from 'react-redux'
import {addToCart, increaseQuantity} from '../store'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap'

class Breakfast extends React.Component {
  constructor(props) {
    super(props)
    this.addCart = this.addCart.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.containsItem = this.containsItem.bind(this)
  }

  addCart = () => {
    event.preventDefault()
    this.props.addToCartThunk(this.props.breakfast)
  }

  containsItem(breakfastId) {
    const cart = this.props.cart.cart
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].cartItem.breakfastId === breakfastId) {
        return true
      }
    }
    return false
  }

  handleClick = () => {
    event.preventDefault()
    if (this.containsItem(this.props.breakfast.id)) {
      this.props.increaseQuantityThunk(this.props.breakfast)
    } else {
      this.props.addToCartThunk(this.props.breakfast)
    }
  }

  render() {
    return (
      <div className="breakfastItem">
        <div>
          <Card className="text-left">
            <CardImg
              top
              width="150px"
              src={this.props.breakfast.pictureUrl}
              alt="Card image cap"
              className="breakfastImage"
            />
            <CardBody className="cardBody">
              <CardTitle>{this.props.breakfast.name}</CardTitle>
              <CardSubtitle>
                ${(this.props.breakfast.price / 100).toFixed(2)}
              </CardSubtitle>
              <CardText>{this.props.breakfast.description}</CardText>
            </CardBody>
            <Button
              color="primary"
              onClick={this.handleClick}
              className="addToCartBtn"
            >
              Add to Cart
            </Button>
          </Card>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => ({
  addToCartThunk: breakfast => dispatch(addToCart(breakfast)),
  increaseQuantityThunk: breakfast => dispatch(increaseQuantity(breakfast))
})

export default connect(mapStateToProps, mapDispatchToProps)(Breakfast)
