import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchPlants, deletePlant} from '../store/plants'
import {Box, Button, Section, Heading} from 'react-bulma-components'

export class AllPlants extends React.Component {
  componentDidMount() {
    this.props.fetchPlants()
  }

  render() {
    const {plants, user} = this.props
    return (
      <div>
        <Section>
          <Heading align="center">All Plants:</Heading>
          <div id="plant-container">
            {plants.map(plant => {
              return (
                <div className="plant-option" key={plant.id}>
                  <Box>
                    <Link to={`/plants/${plant.id}`}>
                      <img src={plant.imageUrl} />
                      <h4>{plant.name}</h4>
                      <p>${plant.price}</p>
                    </Link>
                    {user.isAdmin && (
                      <Button
                        className="remove-btn"
                        size="small"
                        renderAs="span"
                        color="danger"
                        type="button"
                        onClick={() => this.props.deletePlant(plant.id)}
                      >
                        Remove Plant
                      </Button>
                    )}
                  </Box>
                </div>
              )
            })}
          </div>
        </Section>
      </div>
    )
  }
}

const mapState = state => {
  return {
    plants: state.plants,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchPlants: () => dispatch(fetchPlants()),
    deletePlant: plantId => dispatch(deletePlant(plantId))
  }
}

export default connect(mapState, mapDispatch)(AllPlants)
