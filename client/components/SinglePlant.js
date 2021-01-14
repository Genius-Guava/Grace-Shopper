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
    const plantId = this.props.plantId
    this.props.getSinglePlant(plantId)
  }

  render() {
    const {plant} = this.props
    console.log()

    return (
      <div>
        <h3> Single Plant</h3>
      </div>
    )
  }
}

const mapState = state => {
  return {
    plant: state.plant
  }
}

const mapDispatch = dispatch => {
  return {
    getSinglePlant: () => dispatch(getSinglePlant())
  }
}

export default connect(mapState, mapDispatch)(SinglePlant)
