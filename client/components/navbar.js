import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Icon} from 'react-bulma-components'
import {fetchCart} from '../store/cart'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cartTotal: props.cart && props.cart.plants ? props.cart.plant.length : 0
    }
  }

  async componentDidUpdate(prevProps) {
    const {cart, isLoggedIn} = this.props
    if (cart !== prevProps.cart) {
      this.setState({cartTotal: cart.plants.length})
    } else if (isLoggedIn && isLoggedIn !== prevProps.isLoggedIn) {
      await this.props.fetchCart()
      try {
        this.setState({
          cartTotal: this.props.cart.plants.length
        })
      } catch (err) {
        console.error()
      }
    } else if (
      !isLoggedIn &&
      isLoggedIn !== prevProps.isLoggedIn &&
      this.state.cartTotal
    ) {
      this.setState({
        cartTotal: 0
      })
    }
  }

  render() {
    const {handleClick, isLoggedIn, user} = this.props

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
          {isLoggedIn ? (
            <div className="navbar-end">
              {this.props.user.isAdmin && (
                <Link className="navbar-item" to="/users">
                  View Users
                </Link>
              )}
              <a className="navbar-item" href="#" onClick={handleClick}>
                Logout
              </a>
              <Link className="navbar-item" to="/cart">
                <i className="fas fa-shopping-bag fa-lg" />
                <div className="cart-total">{this.state.cartTotal}</div>
              </Link>
            </div>
          ) : (
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
                <div className="cart-total">{this.state.cartTotal}</div>
              </Link>
            </div>
          )}
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
    fetchCart: () => dispatch(fetchCart())
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
