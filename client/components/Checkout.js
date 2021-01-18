import React from 'react'
import {checkoutCart} from '../store/cart'
import {connect} from 'react-redux'
import {Button} from 'react-bulma-components'

class Checkout extends React.Component {
  render() {
    const {cart} = this.props

    return (
      <div>
        {cart.status === 'In Cart' ? (
          <div>
            <h3>Would you like to checkout?</h3>
            <Button
              onClick={() => {
                this.props.checkoutCart(cart.id)
              }}
            >
              <strong>Confirm Checkout</strong>
            </Button>
          </div>
        ) : (
          <h3>You've successfully checked out!</h3>
        )}
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

export default connect(mapState, mapDispatch)(Checkout)
