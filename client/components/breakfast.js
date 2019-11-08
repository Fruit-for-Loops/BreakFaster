import React from 'react'
import {connect} from 'react-redux'
import {addToCart, getCart, increaseQuantity} from '../store'
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

  componentDidMount() {
    this.props.getCartThunk()
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
            />
            <CardBody className="cardBody">
              <CardTitle>{this.props.breakfast.name}</CardTitle>
              <CardSubtitle>${this.props.breakfast.price}</CardSubtitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
            </CardBody>
            <Button color="primary" onClick={this.handleClick}>
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
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => ({
  getCartThunk: () => dispatch(getCart()),
  addToCartThunk: breakfastId => dispatch(addToCart(breakfastId)),
  increaseQuantityThunk: breakfastId => dispatch(increaseQuantity(breakfastId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Breakfast)

// export default Breakfast
