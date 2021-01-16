import {render} from 'enzyme'
import React from 'react'
import {connect} from 'react-redux'
import {getSinglePlant} from '../store/singlePlant'
import UpdatePlant from './UpdatePlant'
import {Link} from 'react-router-dom'

export class SinglePlant extends React.Component {
  componentDidMount() {
    this.props.getSinglePlant(this.props.computedMatch.params.plantId)
  }

  render() {
    const {plant, user} = this.props

    return (
      <div>
        <div>
          <h5>
            {plant.name} ${plant.price}
          </h5>
          <img src={plant.imageUrl} />
          <p>{plant.description}</p>
          <p>This plant is:</p>
          <p>-{plant.light}</p>
        </div>
        {user.isAdmin && (
          <Link to={`/plants/${plant.id}/update`}>Update Plant</Link>
        )}
      </div>
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
