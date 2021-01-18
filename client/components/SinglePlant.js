import {render} from 'enzyme'
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button, Box, Heading, Section} from 'react-bulma-components'
import {getSinglePlant} from '../store/singlePlant'
import axios from 'axios'

export class SinglePlant extends React.Component {
  constructor() {
    super()
    this.addToCart = this.addToCart.bind(this)
  }
  componentDidMount() {
    this.props.getSinglePlant(this.props.match.params.plantId)
  }

  async addToCart(id) {
    try {
      await axios.put('/api/cart', {id: id})
    } catch (err) {
      console.log(err)
    }
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
            <Button size="small" onClick={() => this.addToCart(plant.id)}>
              <strong>Add To Cart</strong>
            </Button>
          </div>
          <br />
          {user.isAdmin && (
            <Button size="small is-warning">
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
    getSinglePlant: plantId => dispatch(getSinglePlant(plantId))
  }
}

export default connect(mapState, mapDispatch)(SinglePlant)
