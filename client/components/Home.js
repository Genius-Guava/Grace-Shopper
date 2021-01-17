import React from 'react'
import {connect} from 'react-redux'
import {Button, Section} from 'react-bulma-components'
import {Link} from 'react-router-dom'

const Home = ({isLoggedIn, email}) => {
  return (
    <div className="homePage">
      <Section align="center">
        <Button className="home-btn" size="small">
          <Link to="/plants">Shop Now</Link>
        </Button>
      </Section>
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
