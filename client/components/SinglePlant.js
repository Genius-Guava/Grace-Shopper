import {render} from 'enzyme'
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button, Box, Heading, Section} from 'react-bulma-components'
import {getSinglePlant} from '../store/singlePlant'
import {editCart} from '../store/cart'

export class SinglePlant extends React.Component {
  componentDidMount() {
    this.props.getSinglePlant(this.props.match.params.plantId)
  }

  render() {
    const {plant, user} = this.props
    return (
      <Section className="columns is-centered background">
        <Box className="column is-half single-plant-container is-centered">
          <div>
            <Heading align="center">{plant.name}</Heading>
            <img className="plant-image" src={plant.imageUrl} />
            <br />
            <b>
              <p className="single-plant-text total">${plant.price}</p>
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
              <Button size="small">
                <strong>
                  <Link to="/login">Log In To Add To Cart</Link>
                </strong>
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
