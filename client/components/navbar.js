import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Navbar, Nav} from 'react-bootstrap'

const Navigation = ({handleClick, isLoggedIn}) => (
  <Navbar collapseOnSelect expand="lg" static="top" bg="fire">
    <Navbar.Brand>
      <Link to="/">Helios Wands</Link>
    </Navbar.Brand>
    {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav>
        <Navbar.Text>
          <Link to="/cart">Cart</Link>
        </Navbar.Text>
        <Navbar.Text>
          <Link to="/products">Wands</Link>
        </Navbar.Text>
        <Navbar.Text>
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
        </Navbar.Text>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
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

export default connect(mapState, mapDispatch)(Navigation)

/**
 * PROP TYPES
 */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
