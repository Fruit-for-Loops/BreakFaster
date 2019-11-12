import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'reactstrap'

const Filters = props => {
  return (
    <div>
      <h1>Filters</h1>
      <div className="filters">
        <Button outline color="primary">
          Sort by Price
        </Button>{' '}
        <Button outline color="secondary">
          Vegan
        </Button>{' '}
        <Button outline color="success">
          gluten-free
        </Button>{' '}
        <Button outline color="info">
          non-dairy
        </Button>{' '}
        <Button outline color="warning">
          warning
        </Button>{' '}
        <Button outline color="danger">
          danger
        </Button>
      </div>
    </div>
  )
}

export default connect(null)(Filters)
