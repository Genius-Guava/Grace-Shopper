import React from 'react'
import {checkoutCart} from '../store/cart'
import {connect} from 'react-redux'
import {
  Button,
  Heading,
  Section,
  Container,
  Notification
} from 'react-bulma-components'
import {checkOutLocal} from '../store/localCart'

class Checkout extends React.Component {
  render() {
    let {cart, localCart, isLoggedIn} = this.props
    if (!isLoggedIn) cart = localCart

    return (
      <div>
        <Section align="center">
          {cart.status === 'In Cart' ? (
            <div>
              <Heading>Would you like to checkout?</Heading>
              {isLoggedIn ? (
                <Button
                  onClick={() => {
                    this.props.checkoutCart(cart.id)
                  }}
                >
                  <strong>Confirm Checkout</strong>
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    this.props.checkOutLocal()
                  }}
                >
                  <strong>Confirm Checkout</strong>
                </Button>
              )}
            </div>
          ) : (
            <Section>
              <Container>
                <Notification color="warning">
                  <Heading id="cartTxt" className="empty-cart">
                    You have successfully checked out!
                  </Heading>
                </Notification>
              </Container>
            </Section>
          )}
        </Section>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart,
    localCart: state.localCart,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    checkoutCart: cartId => dispatch(checkoutCart(cartId)),
    checkOutLocal: () => dispatch(checkOutLocal())
  }
}

export default connect(mapState, mapDispatch)(Checkout)
