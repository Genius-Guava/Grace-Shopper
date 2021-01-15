import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Columns, Button, Section, Icon} from 'react-bulma-components'
import {Form} from 'react-bulma-components'
/**
 * COMPONENT
 */
class AuthForm extends React.Component {
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
  handleSubmit(evt) {
    evt.preventDefault()
    const formName = evt.target.name
    const email = evt.target.email.value
    const password = evt.target.password.value
    this.props.auth(email, password, formName)
  }
  onChange(event) {
    const state = {...this.state}
    state[event.target.name] = event.target.value
    this.setState(state)
  }

  render() {
    const {name, displayName, handleSubmit, error} = this.props
    return (
      <Columns id="logIn" breakpoint="mobile" centered>
        <Columns.Column className="control" size="half">
          <form onSubmit={this.handleSubmit}>
            <Section>
              <Form.Field size="medium">
                <Form.Label className="form-label">Name</Form.Label>
                <Form.Control>
                  <Form.Input
                    placeholder="Username"
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
                    placeholder="Please enter your Email"
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
                    placeholder="Please enter your Password"
                    name="password"
                    type="password"
                    onChange={this.onChange}
                    value={this.state.password}
                  />
                </Form.Control>
              </Form.Field>
            </Section>
            <Section align="right">
              <Button className="submit-button is-focused is-primary">
                <strong>Submit</strong>
              </Button>
            </Section>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
          <a href="/auth/google">{displayName} with Google</a>
        </Columns.Column>
      </Columns>
    )
  }
}
/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    auth: (email, password, formName) =>
      dispatch(auth(email, password, formName))
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  auth: PropTypes.func.isRequired,
  error: PropTypes.object
}
