import React from 'react'
import {fetchCart, removeFromCart, checkoutCart} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button} from 'react-bulma-components'

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    const {cart} = this.props
    return (
      <div>
        <h3>Cart: </h3>
        {cart.plants !== undefined && cart.plants.length ? (
          cart.plants.map(plant => {
            return (
              <div key={plant.id}>
                <h3>Item: {plant.name}</h3>
                <p>Quantity: {plant.lineItem.quantity}</p>
                <Button onClick={() => this.props.removeFromCart(plant.id)}>
                  <strong>Remove From Cart</strong>
                </Button>
              </div>
            )
          })
        ) : (
          <p>Cart is empty</p>
        )}
        {cart.plants !== undefined && cart.plants.length ? (
          <Button>
            <Link to="/cart/checkout">
              <strong>To Checkout</strong>
            </Link>
          </Button>
        ) : (
          <p />
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
    fetchCart: () => dispatch(fetchCart()),
    removeFromCart: id => dispatch(removeFromCart(id)),
    checkoutCart: cartId => dispatch(checkoutCart(cartId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
