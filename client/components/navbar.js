import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {
  Columns,
  Button,
  Section,
  Icon,
  Navbar as _Navbar
} from 'react-bulma-components'

class Navbar extends React.Component {
  constructor() {
    super()
    this.navbarRight = this.navbarRight.bind(this)
  }

  navbarRight() {
    const handleClick = this.props.handleClick
    const isLoggedIn = this.props.isLoggedIn

    if (isLoggedIn) {
      return (
        <div className="navbar-end">
          <_Navbar.Item dropdown href="#" hoverable>
            <_Navbar.Link>
              <Icon>
                <i className="fas fa-user" size="2px" />
              </Icon>
            </_Navbar.Link>
            <_Navbar.Dropdown>
              <Link className="navbar-item" to="/editprofile">
                Edit Profile
              </Link>
              <_Navbar.Item href="#" onClick={handleClick}>
                Logout
              </_Navbar.Item>
            </_Navbar.Dropdown>
          </_Navbar.Item>

          <Link className="navbar-item" to="/cart">
            <i className="fas fa-shopping-bag fa-lg" />
          </Link>
        </div>
      )
    } else {
      return (
        <div className="navbar-end">
          <Link className="navbar-item" to="/login">
            Login
          </Link>
          <Link className="navbar-item" to="/signup">
            Sign Up
          </Link>
          <Link className="navbar-item" to="/cart">
            <Icon>
              <i className="fas fa-shopping-bag fa-lg" />
            </Icon>
          </Link>
        </div>
      )
    }
  }

  render() {
    const user = this.props.user
    return (
      <_Navbar
        id="navBar"
        className="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/home">
              {' '}
              <Icon size="large">
                <i className="fas fa-leaf fa-lg" />
              </Icon>{' '}
              <span>Home</span>
            </Link>
            <Link className="navbar-item" to="/plants">
              All Plants
            </Link>
            {user.isAdmin && (
              <Link className="navbar-item" to="/plants/addplant">
                Add New Plant
              </Link>
            )}
          </div>

          {this.navbarRight()}
        </div>
      </_Navbar>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
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

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
