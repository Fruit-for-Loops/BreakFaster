import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import {logout} from '../store/user'
import {Login, Signup} from '../components'

const Navbar = ({handleClick, isLoggedIn, userEmail}) => (
  <div>
    <nav>
      <h1>BreakFaster</h1>
      <div>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
      </div>
      <div>
        {isLoggedIn ? (
          <div>
            {/* {Will show welcome, name and on hover will show option to logout */}
            <div className="dropdown">
              <Link className="dropdownBtn" id="welcome">
                Welcome, {userEmail}
              </Link>
              <div className="dropdownContent" onClick={handleClick}>
                <a href="#" className="logout">
                  Logout
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="loginNav">
            {/* On hover display login form or sign up form - once logged in, repalce "login and sign up with email" */}
            <div className="dropdown">
              <a>Login</a>
              <div className="dropdownContent">
                <Login />
              </div>
            </div>
            <div className="dropdown">
              <a>Sign Up</a>
              <div className="dropdownContent">
                <Signup />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userEmail: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
