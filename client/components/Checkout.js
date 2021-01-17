import React from 'react'
import {checkoutCart} from '../store/cart'
import {connect} from 'react-redux'

class Cart extends React.Component {
  render() {
    const {cart} = this.props
    return (
      <div>
        <h3>You have successfully checked out!</h3>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    checkoutCart: cartId => dispatch(checkoutCart(cartId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
