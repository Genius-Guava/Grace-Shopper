import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, UserHome} from './components'
import AllPlants from './components/AllPlants'
import NewPlant from './components/NewPlant'
import {me} from './store'
import Home from './components/Home'
import SinglePlant from './components/SinglePlant'
import SignUp from './components/SignUp'
import Cart from './components/Cart'
import Users from './components/Users'
import {isAdmin} from '../server/api/security'
import UpdatePlant from './components/UpdatePlant'
import Checkout from './components/Checkout'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    // const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/plants/addplant" component={NewPlant} />
        <Route path="/users" component={Users} />
        <Route path="/plants/:plantId/update" component={UpdatePlant} />
        <Route path="/users" component={Users} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/home" component={Home} />
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/plants" component={AllPlants} />
        <Route path="/plants/:plantId" component={SinglePlant} />
        <Route path="/cart/checkout" component={Checkout} />
        {isAdmin && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Home} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
