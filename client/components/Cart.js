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
  Image,
  Form,
  Columns
} from 'react-bulma-components'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      promocode: '',
      total:
        this.props.cart.plants &&
        this.props.cart.plants.reduce((acc, plant) => {
          acc += plant.price * plant.lineItem.quantity
          return acc
        }, 0)
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePromo = this.handlePromo.bind(this)
  }
  componentDidMount() {
    this.props.fetchCart()
  }
  handleChange(evt) {
    this.setState({
      promocode: evt.target.value
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    if (this.state.promocode === 'GH2011') {
      this.handlePromo()
    }
  }
  handlePromo() {
    this.setState({
      total:
        this.props.cart.plants &&
        this.props.cart.plants.reduce((acc, plant) => {
          acc += plant.price * plant.lineItem.quantity
          return acc
        }, 0) / 2
    })
  }

  render() {
    const {cart} = this.props
    let total =
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
                              className="button is-danger is-outlined"
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
            <div className="is-one-third is-centered">
              <Columns.Column className="control">
                <form align="center" onSubmit={this.handleSubmit}>
                  <Form.Label className="form-label">Promo:</Form.Label>
                  <Form.Field size="medium" className="promo">
                    <Form.Control>
                      <Form.Input
                        size="small"
                        placeholder="Enter promo-code"
                        type="text"
                        name="name"
                        value={this.state.promocode}
                        onChange={this.handleChange}
                      />
                    </Form.Control>
                  </Form.Field>
                  <Button className="cart-submit-button is-success is-outlined is-small">
                    <strong>Submit</strong>
                  </Button>
                </form>
              </Columns.Column>
              <p>
                <strong>Cart Total: </strong> $
                {(this.state.total > 0 ? this.state.total : total).toFixed(2)}
              </p>
              <Button
                size="small"
                className="button is-info is-outlined checkout-btn"
              >
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
