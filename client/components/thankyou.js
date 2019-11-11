import React from 'react'
import {Link} from 'react-router-dom'

const ThankYou = props => {
  return (
    <div className="thankYou">
      <h1>Thank you for your order!</h1>
      <Link to="/home">Return home</Link>
    </div>
  )
}

export default ThankYou
