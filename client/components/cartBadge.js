import React from 'react'
import {Badge, Button} from 'reactstrap'

const CartBadge = props => {
  return (
    <div>
      <Button color="primary" outline>
        Items In Cart: <Badge color="secondary" />
      </Button>
    </div>
  )
}

export default CartBadge
