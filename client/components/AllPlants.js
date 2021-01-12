import React from 'react'
import {connect} from 'react-redux'
import {fetchPlants} from '../store/plants'

export class AllPlants extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchPlants()
  }

  render() {
    return (
      <div>
        <h3>Plants</h3>
      </div>
    )
  }
}

const mapState = state => {
  return {
    plants: state.plants
  }
}

const mapDispatch = dispatch => {
  return {
    fetchPlants: () => dispatch(fetchPlants())
  }
}

export default connect(mapState, mapDispatch)(AllPlants)
