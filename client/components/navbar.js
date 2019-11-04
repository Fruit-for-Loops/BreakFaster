import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import {logout} from '../store'
import UserHome from './user-home'

const Navbar = ({handleClick, isLoggedIn, userEmail}) => (
  <div>
    <h1>Breakfaster</h1>
    <nav>
      <div>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
      </div>
      <div>
        {isLoggedIn ? (
          <div>
            {/* {Will show welcome, name and on hover will show option to logout */}
            <div className="logoutDropdown">
              <Link className="dropdownBtn">Welcome, {userEmail}</Link>
              <div className="dropdownContent">
                <a href="#" onClick={handleClick} className="logout">
                  Logout
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* On hover display login form or sign up form - once logged in, repalce "login and sign up with email" */}
            <Link to="/login" className="loginDropdown">
              Login
            </Link>
            <Link to="/signup" className="signupDropdown">
              Sign Up
            </Link>
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
