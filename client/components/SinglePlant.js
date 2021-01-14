// import { render } from 'enzyme'
// import React from 'react'
// import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
// import {fetchPlants} from '../store/plants'

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

// const mapState = (state) => {
//   return {
//     plants: state.plants,
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     fetchPlants: () => dispatch(fetchPlants()),
//   }
// }

// export default connect(mapState, mapDispatch)(SinglePlant)
