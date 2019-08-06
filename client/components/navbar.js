import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Navbar, Nav} from 'react-bootstrap'

class Navigation extends React.Component {
  userLink = userId => {
    return `/home/${userId}`
  }
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" static="top" bg="fire">
        <Navbar.Brand>
          <Link to="/" className="color link">
            Helios Wands
          </Link>
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="justify-content-end">
            <Navbar.Text>
              <Link className="color link" to="/cart">
                Cart
              </Link>
            </Navbar.Text>
            <Navbar.Text>
              <Link className="color link" to="/products">
                Wands
              </Link>
            </Navbar.Text>
            <Navbar.Text>
              {this.props.isLoggedIn ? (
                <ul className="nav navbar-nav">
                  {/* The navbar will show these links after you log in */}
                  <Link
                    className="color link"
                    to={this.userLink(this.props.user.id)}
                  >
                    Profile
                  </Link>
                  <a href="#" onClick={this.props.handleClick}>
                    Logout
                  </a>
                </ul>
              ) : (
                <ul className="nav navbar-nav">
                  {/* The navbar will show these links before you log in */}
                  <Link to="/login" className="color link">
                    Login
                  </Link>
                  <Link to="/signup" className="color link">
                    Sign Up
                  </Link>
                </ul>
              )}
              {/* for admin access only */}
              {this.props.isAdmin ? (
                <ul className="nav navbar-nav">isadmin!</ul>
              ) : (
                <ul className="nav navbar-nav">notadmin!!</ul>
              )}
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.admin,
    user: state.user
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
