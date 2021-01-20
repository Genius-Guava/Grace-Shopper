import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {fetchCart, clearCart} from '../store/cart'
import {Icon, Navbar as _Navbar} from 'react-bulma-components'

class Navbar extends React.Component {
  constructor(props) {
    super(props)

    this.navbarRight = this.navbarRight.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  navbarRight() {
    const handleClick = this.props.handleClick
    const isLoggedIn = this.props.isLoggedIn
    if (isLoggedIn) {
      return (
        <div className="navbar-end">
          {this.props.user.isAdmin && (
            <Link className="navbar-item" to="/users">
              View Users
            </Link>
          )}
          <_Navbar.Item dropdown href="#" hoverable>
            <_Navbar.Link>
              <Icon>
                <i className="fas fa-user" size="2px" />
              </Icon>
            </_Navbar.Link>
            <_Navbar.Dropdown>
              <Link className="navbar-item" to="/editprofile">

                <i className="fas fa-cog fa-1x" />
                <strong> Edit Profile </strong>
              </Link>
              <_Navbar.Item
                href="#"
                onClick={() => {
                  this.props.handleClick()
                  this.props.clearCart()
                }}
              >
                <i className="fas fa-sign-out-alt fa-1x" />
                <strong> Logout </strong>

              </_Navbar.Item>
            </_Navbar.Dropdown>
          </_Navbar.Item>

          <Link className="navbar-item" to="/cart">
            <Icon>
              <i className="fas fa-shopping-bag fa-lg" />
            </Icon>
            <div className="cart-total">
              {isLoggedIn && this.props.cart.plants
                ? this.props.cart.plants.reduce((acc, plant) => {
                    acc += plant.lineItem.quantity
                    return acc
                  }, 0)
                : 0}
            </div>
            {/* <div className="cart-total">{this.state.cartTotal}</div> */}
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
            <div className="cart-total">
              {isLoggedIn && this.props.cart.plants
                ? this.props.cart.plants.reduce((acc, plant) => {
                    acc += plant.lineItem.quantity
                    return acc
                  }, 0)
                : 0}
            </div>
          </Link>
        </div>
      )
    }
  }

  render() {
    const {user} = this.props

    return (
      <_Navbar
        id="navBar"
        className="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div id="navMenu" className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/home">
              <Icon size="large">
                <i className="fas fa-leaf fa-lg" />
              </Icon>
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
          <div className="nav-appname">
            <p align="center">leafly</p>
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
    user: state.user,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    fetchCart: () => dispatch(fetchCart()),
    clearCart: () => dispatch(clearCart())
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
