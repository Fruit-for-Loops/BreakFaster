import React from 'react'
import {Link} from 'react-router-dom'

const ThankYou = props => {
  return (
    <div className="thankYou">
      <h1>Thank you for your order!</h1>
      <h2>
        <Link to="/home">Return home</Link>
      </h2>
    </div>
  )
}

export default ThankYou
