import React from 'react'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap'

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

// export default Breakfast
