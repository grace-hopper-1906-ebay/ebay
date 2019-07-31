import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav className="navbar navbar-fixed-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/">
          WebSiteName
        </Link>
      </div>
      <div>
        <Link to="/cart">
          <img src="https://t3.ftcdn.net/jpg/01/28/03/88/160_F_128038885_VcHWsuiAblK57vjzUcDAuJsSfkcJWdTs.jpg" />
        </Link>
      </div>
      <div>
        <Link to="/products">Wands</Link>
      </div>
      {isLoggedIn ? (
        <ul className="nav navbar-nav">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </ul>
      ) : (
        <ul className="nav navbar-nav">
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </ul>
      )}
    </div>
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
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
