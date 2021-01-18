import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchPlants, deletePlant} from '../store/plants'
import {Box, Button, Section, Heading} from 'react-bulma-components'

export class AllPlants extends React.Component {
  constructor() {
    super()
    this.state = {
      filter: 'all'
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.fetchPlants()
  }

  handleChange(event) {
    this.setState({filter: event.target.value})
  }
  render() {
    let {plants, user} = this.props
    if (this.state.filter === 'all') {
      plants = this.props.plants
    } else if (this.state.filter === 'bright') {
      plants = plants.filter(plant => plant.light === 'Bright')
    } else {
      plants = plants.filter(plant => plant.light === 'Low to Partial')
    }
    return (
      <div>
        <Section align="center">
          <Heading>All Plants</Heading>
          <div className="select is-small light-filter">
            <select
              name="light"
              value={this.state.light}
              onChange={this.handleChange}
            >
              <option value="filter-by" hidden>
                Filter by:
              </option>
              <option value="all">All Plants</option>
              <option value="low">Low to Partial Light</option>
              <option value="bright">Bright Light</option>
            </select>
          </div>
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
