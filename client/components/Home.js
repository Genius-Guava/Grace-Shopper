import React from 'react'
import {connect} from 'react-redux'
import {Button, Section} from 'react-bulma-components'
import {Link} from 'react-router-dom'

// const Home = ({isLoggedIn, email}) => {
//   return (
//     <div className="homePage">
//       <div align="center" className='app-caption'>
// <h1 align="center" className="appName" style={{fontSize:"12vw"}}>
//           leafly
//         </h1>
//         {/* <button class="button is-success is-light">Success</button> */}
//         <Button className="home-btn button is-success is-light" size="small">
//           <Link to="/plants">Shop Now</Link>
//         </Button>
//       </div>
//     </div>
//   )
// }

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    email: state.user.email
  }
}

export default connect(mapState)(Home)
