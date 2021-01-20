import {render} from 'enzyme'
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button, Box, Heading, Section} from 'react-bulma-components'
import {getSinglePlant} from '../store/singlePlant'
import {editCart} from '../store/cart'
import {UpdatePlant} from './UpdatePlant'

export class SinglePlant extends React.Component {
  constructor(props) {
    super(props)
    this.addToLocalCart = this.addToLocalCart.bind(this)
    this.cart = JSON.parse(localStorage.getItem('cart'))
  }

  componentDidMount() {
    this.props.getSinglePlant(this.props.match.params.plantId)
  }

  addToLocalCart(cart, plant) {
    let inCart = false
    for (let i = 0; i < cart.plants.length; i++) {
      if (cart.plants[i].id === plant.id) {
        inCart = true
        console.log(cart.plants[i].lineItem)
        cart.plants[i].lineItem.quantity = cart.plants[i].lineItem.quantity + 1
      }
    }
    if (!inCart) {
      plant.lineItem = {}
      plant.lineItem.quantity = 1
      console.log(plant.lineItem.quantity)
      cart.plants.push(plant)
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    console.log(cart.plants)
  }

  render() {
    const {plant, user} = this.props
    return (
      <Section className="columns is-centered">
        <Box className="column is-half single-plant-container is-centered">
          <div>
            <Heading align="center">{plant.name}</Heading>
            <img className="plant-image" src={plant.imageUrl} />
            <br />
            <b>
              <p className="single-plant-text">${plant.price}</p>
            </b>
            <p className="single-plant-text">{plant.description}</p>
            <p className="light single-plant-text">
              <b>Light:</b> {plant.light} <i className="far fa-sun" />
            </p>
            {user.id ? (
              <Button
                size="small"
                onClick={() => this.props.editCart(plant.id)}
              >
                <strong>Add To Cart</strong>
              </Button>
            ) : (
              // <Button size="small">
              //   <strong>
              //     <Link to="/login">Log In To Add To Cart</Link>
              //   </strong>
              // </Button>
              <Button
                size="small"
                onClick={() => this.addToLocalCart(this.cart, plant)}
              >
                <strong>Add To Cart</strong>
              </Button>
            )}
          </div>
          <br />
          {user.isAdmin && (
            <Button size="small" className="is warning">
              <Link to={`/plants/${plant.id}/update`}>Update Plant</Link>
            </Button>
          )}
        </Box>
      </Section>
    )
  }
}

const mapState = state => {
  return {
    plant: state.singlePlant,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getSinglePlant: plantId => dispatch(getSinglePlant(plantId)),
    editCart: plantId => dispatch(editCart(plantId))
  }
}

export default connect(mapState, mapDispatch)(SinglePlant)
