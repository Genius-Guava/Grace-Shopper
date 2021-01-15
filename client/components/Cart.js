import React from 'react'
import {fetchCart} from '../store/cart'
import {connect} from 'react-redux'

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    const {cart} = this.props
    console.log(cart)
    return (
      <div>
        <h3>Cart: </h3>
        {cart.plants ? (
          cart.plants.map(plant => {
            return (
              <div key={plant.id}>
                <h3>Item: {plant.name}</h3>
                <p>Quantity: {plant.lineItem.quantity}</p>
              </div>
            )
          })
        ) : (
          <p>Cart is empty</p>
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
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(mapState, mapDispatch)(Cart)
