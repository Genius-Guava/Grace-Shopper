import React from 'react'
import {fetchCart, removeFromCart, checkoutCart} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Tile, Button, Heading, Box} from 'react-bulma-components'

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    const {cart} = this.props
    return (
      <div className="cart-container">
        {cart.plants !== undefined && cart.plants.length ? (
          cart.plants.map(plant => {
            return (
              <div key={plant.id}>
                <Tile kind="parent">
                  <Tile
                    renderAs="article"
                    kind="child"
                    notification
                    color="warning"
                  >
                    <Heading>{plant.name}</Heading>
                    <img className="plant-image" src={plant.imageUrl} />
                    <Heading subtitle>
                      Quantity: {plant.lineItem.quantity}
                    </Heading>
                    <div className="content">
                      <Button
                        onClick={() => this.props.removeFromCart(plant.id)}
                      >
                        <strong>Remove From Cart</strong>
                      </Button>
                    </div>
                  </Tile>
                </Tile>
              </div>
            )
          })
        ) : (
          <Heading>Cart is empty</Heading>
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
