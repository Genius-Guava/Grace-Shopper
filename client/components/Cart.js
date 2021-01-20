import React from 'react'
import {fetchCart, removeFromCart, checkoutCart} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  Button,
  Heading,
  Box,
  Media,
  Section,
  Content,
  Image
} from 'react-bulma-components'

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    const {cart} = this.props
    const total =
      cart.plants &&
      cart.plants.reduce((acc, plant) => {
        acc += plant.price * plant.lineItem.quantity
        return acc
      }, 0)
    return (
      <div className="cart-container">
        <Section align="center">
          <Heading className="cart-heading">Cart</Heading>
          {cart.plants !== undefined && cart.plants.length ? (
            cart.plants.map(plant => {
              return (
                <div key={plant.id} className="columns is-centered">
                  <Box
                    className="cart-item column is-one-third is-centered"
                    responsive={{
                      mobile: {
                        display: {
                          value: 'block'
                        }
                      },
                      tablet: {
                        display: {
                          value: 'flex'
                        }
                      },
                      desktop: {
                        display: {
                          value: 'inline-flex',
                          only: true
                        }
                      },
                      widescreen: {
                        display: {
                          value: 'inline-block'
                        }
                      }
                    }}
                    hide={{
                      tablet: {
                        hide: true,
                        only: true
                      },
                      widescreen: {
                        hide: true
                      }
                    }}
                  >
                    <Media>
                      <Media.Item renderAs="figure" position="left">
                        <Image size={96} alt="64x64" src={plant.imageUrl} />
                      </Media.Item>
                      <Media.Item>
                        <Content>
                          <p className="plantname">
                            <strong>{plant.name} </strong>
                          </p>
                          <p className="plantprice">${plant.price}</p>

                          <p>
                            <strong>Quantity: </strong>
                            {plant.lineItem.quantity}
                          </p>

                          <div className="content">
                            <Button
                              size="small"
                              onClick={() =>
                                this.props.removeFromCart(plant.id)
                              }
                            >
                              <strong>Remove From Cart</strong>
                            </Button>
                          </div>
                        </Content>
                      </Media.Item>
                    </Media>
                  </Box>
                </div>
              )
            })
          ) : (
            <Heading className="empty-cart">Cart is empty!</Heading>
          )}
          {cart.plants !== undefined && cart.plants.length ? (
            <div>
              <p>
                <strong>Cart Total: </strong>${total}.00
              </p>
              <Button size="small">
                <Link to="/cart/checkout">
                  <strong>To Checkout</strong>
                </Link>
              </Button>
            </div>
          ) : (
            <p />
          )}
        </Section>
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
