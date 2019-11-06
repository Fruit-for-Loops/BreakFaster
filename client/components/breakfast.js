import React from 'react'
import {connect} from 'react-redux'
import {addToCart} from '../store'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap'

// const addCart = (event) =>{
//   event.preventDefault();
//   addToCartThunk(event.target.id);
// }

export const Breakfast = props => {
  return (
    <div className="breakfastItem">
      <div>
        <Card className="text-left">
          <CardImg
            top
            width="150px"
            src={props.breakfast.pictureUrl}
            alt="Card image cap"
          />
          <CardBody className="cardBody">
            <CardTitle>{props.breakfast.name}</CardTitle>
            <CardSubtitle>${props.breakfast.price}</CardSubtitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </CardText>
          </CardBody>
          <Button color="primary">Add to Cart</Button>
        </Card>
      </div>
    </div>
  )
}

// const mapStateToProps = state => {
//   return {
//     user: state.user,
//     cart: state.cart
//   }
// }

// const mapDispatchToProps = dispatch => ({
//   addToCartThunk: (breakfastId) => dispatch(addToCart(breakfastId))
// })

// export default connect(null, mapDispatchToProps)(Breakfast)

// export default Breakfast
