import {render} from 'enzyme'
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSinglePlant} from '../store/singlePlant'

// export class SinglePlant extends React.Component {
//   componentDidMount() {
//     this.props.fetchPlants()
//   }
// }

// render(){
//   const {plant} = this.props
//   console.log()
//   return(
//     <div>
//       <h3>Sinlge Plant</h3>

//       <div id = 'plant-container'>
//         {plant.map(plant => {
//           return (
//             <div className='plant-option' key = {plant.id}>
//               <Link to={'/api/plant/${plant.id}'}>
//                 <img src = {plant.imageUrl} />
//                 <h4>{plant.name}</h4>
//                 <p>${plant.price}</p>
//               </Link>
//               </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

export class SinglePlant extends React.Component {
  componentDidMount() {
    this.props.getSinglePlant(this.props.computedMatch.params.plantId)
  }

  render() {
    // console.log('props are', this.props)
    const {plant} = this.props

    return (
      <div>
        <h3> Single Plant</h3>
        <p>Plant Name:</p>
        <h5>{plant.name}</h5>
      </div>
    )
  }
}

const mapState = state => {
  // console.log('stat is ', state)
  return {
    plant: state.singlePlant
  }
}

const mapDispatch = dispatch => {
  return {
    getSinglePlant: id => dispatch(getSinglePlant(id))
  }
}

export default connect(mapState, mapDispatch)(SinglePlant)
