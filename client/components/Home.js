import React from 'react'
import {connect} from 'react-redux'

const Home = ({isLoggedIn, email}) => {
  return (
    <div className="homePage">
      {isLoggedIn ? (
        <h2>Welcome back {email}!</h2>
      ) : (
        <h2>Welcome to Grace Shopper!</h2>
      )}
      <img
        className="homeImage"
        src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/plants1-1551895073.png"
      />
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    email: state.user.email
  }
}

export default connect(mapState)(Home)
