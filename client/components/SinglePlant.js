import {render} from 'enzyme'
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSinglePlant} from '../store/singlePlant'

export class SinglePlant extends React.Component {
  componentDidMount() {
    this.props.getSinglePlant(this.props.computedMatch.params.plantId)
  }

  render() {
    const {plant} = this.props

    return (
      <div>
        <h5>
          {plant.name} ${plant.price}
        </h5>
        <img src={plant.imageUrl} />
        <p>{plant.description}</p>
        <p>This plant is:</p>
        <p>-{plant.light}</p>
        {plant.petFriendly ? <p>-pet friendly</p> : <p>-not pet friendly</p>}
      </div>
    )
  }
}

const mapState = state => {
  return {
    plant: state.singlePlant
  }
}

const mapDispatch = dispatch => {
  return {
    getSinglePlant: plantId => dispatch(getSinglePlant(plantId))
  }
}

export default connect(mapState, mapDispatch)(SinglePlant)
