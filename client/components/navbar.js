import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Columns, Button, Section, Icon} from 'react-bulma-components'

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
          <a className="navbar-item" href="#" onClick={handleClick}>
            Logout
          </a>
          <Link className="navbar-item" to="/signup">
            Sign Up
          </Link>
          <Link className="navbar-item" to="/cart">
            Cart
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
            Cart
          </Link>
        </div>
      )
    }
  }

  render() {
    return (
      <nav
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
          </div>

          {this.navbarRight()}
        </div>
      </nav>
    )
  }
}

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
