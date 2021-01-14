import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Columns, Button, Section, Icon} from 'react-bulma-components'
import {Form} from 'react-bulma-components'

/**
 * COMPONENT
 */
class SignUp extends React.Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  onChange(event) {
    const state = {...this.state}
    state[event.target.name] = event.target.value
    this.setState(state)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.auth(this.state.email, this.state.password, this.props.name)
  }

  render() {
    const {name, displayName, handleSubmit, error} = this.props
    return (
      <Columns breakpoint="mobile" centered>
        <Columns.Column size="half">
          <form onSubmit={this.handleSubmit}>
            <Section>
              <Form.Field size="medium">
                <Form.Label className="form-label">First Name</Form.Label>
                <Form.Control>
                  <Form.Input
                    placeholder="First Name"
                    name="name"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.name}
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field>
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control iconLeft>
                  <Form.Input
                    placeholder="Please enter an Email Address"
                    name="email"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.email}
                  />
                  <Icon align="left">
                    <i className="fas fa-envelope" />
                  </Icon>
                </Form.Control>
              </Form.Field>

              <Form.Field>
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control>
                  <Form.Input
                    placeholder="Create Password"
                    name="password"
                    type="password"
                    onChange={this.onChange}
                    value={this.state.password}
                  />
                </Form.Control>
              </Form.Field>
            </Section>
            <Section align="right">
              <Button className="submit-button" color="success">
                Submit
              </Button>
            </Section>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </Columns.Column>
      </Columns>
    )
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    auth: (email, password, formName) =>
      dispatch(auth(email, password, formName))
  }
}

export default connect(mapSignup, mapDispatch)(SignUp)
