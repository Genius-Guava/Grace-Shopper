import {render} from 'enzyme'
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchPlants} from '../store/plants'

export class SinglePlant extends React.Component {
  componentDidMount() {
    this.props.fetchPlants()
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

// const {plant} = this.props
// console.log()
// return(
//   <div>
//     <h3>Single Plant</h3>

//     <div id = 'plant-container'>
//       {singlePlant.map(singlePlant => {
//         return (
//           <div className='plant-option' key = {singlePlant.id}>
//             <Link to={'/api/singlePlant/${singlePlant.id}'}>
//               <img src = {singlePlant.imageUrl} />
//               <h4>${singlePlant.name}</h4>
//               <p>${singlePlant.price}</p>
//             </Link>
//             </div>
//         )
//       })}
//     </div>
//   </div>
// )

const mapState = state => {
  return {
    singlePlant: state.singlePlant
  }
}

const mapDispatch = dispatch => {
  return {
    fetchPlants: () => dispatch(fetchPlants())
  }
}

export default connect(mapState, mapDispatch)(SinglePlant)
