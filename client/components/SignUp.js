import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {signUp} from '../store'
import {
  Columns,
  Button,
  Section,
  Icon,
  Content,
  Heading
} from 'react-bulma-components'
import {Form} from 'react-bulma-components'
import {formReset} from '../store/form'
/**
 * COMPONENT
 */
class SignUp extends React.Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    this.props.formReset()
  }

  onChange(event) {
    const state = {...this.state}
    state[event.target.name] = event.target.value
    this.setState(state)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.signUp(
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.state.password,
      this.props.name
    )
  }

  render() {
    const {form} = this.props
    return (
      <Columns id="signUp" breakpoint="mobile" centered>
        <Columns.Column className="control" size="half">
          <form onSubmit={this.handleSubmit}>
            <Section>
              <Heading className="headerLoginSignUp">Create an account</Heading>

              <Form.Field size="medium">
                <Form.Label className="form-label">First Name</Form.Label>
                <Form.Control>
                  <Form.Input
                    placeholder="First Name"
                    name="firstName"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.firstName}
                    color={form.errors.firstName && 'danger'}
                  />
                </Form.Control>
                <Form.Help color="danger">{form.errors.firstName}</Form.Help>
              </Form.Field>

              <Form.Field size="medium">
                <Form.Label className="form-label">Last Name</Form.Label>
                <Form.Control>
                  <Form.Input
                    placeholder="Last Name"
                    name="lastName"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.lastName}
                    color={form.errors.lastName && 'danger'}
                  />
                </Form.Control>
                <Form.Help color="danger">{form.errors.lastName}</Form.Help>
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
                    color={form.errors.email && 'danger'}
                  />
                  <Icon align="left">
                    <i className="fas fa-envelope" />
                  </Icon>
                </Form.Control>
                <Form.Help color="danger">{form.errors.email}</Form.Help>
              </Form.Field>

              <Form.Field>
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control iconLeft>
                  <Form.Input
                    placeholder="Create Password"
                    name="password"
                    type="password"
                    onChange={this.onChange}
                    value={this.state.password}
                    color={form.errors.password && 'danger'}
                  />
                  <Icon align="left">
                    <i className="fas fa-lock" />
                  </Icon>
                </Form.Control>
                <Form.Help color="danger">{form.errors.password}</Form.Help>
              </Form.Field>
              {/*
              <label class="checkbox">
                <input type="checkbox">I agree to the <a href="#">terms and conditions</a>
                </label>

                */}

              <Content className="formButtons">
                <Form.Field kind="group" align="right">
                  <Form.Control>
                    <a
                      className="button button is-warning is-focused is-primary"
                      href="/auth/google"
                    >
                      Login with Google
                    </a>
                  </Form.Control>
                  <Form.Control>
                    <Button className="submit-button is-focused is-primary">
                      <strong>Submit</strong>
                    </Button>
                  </Form.Control>
                </Form.Field>

                <Form.Help color="danger">{form.errors.other}</Form.Help>
              </Content>
            </Section>
          </form>
        </Columns.Column>
      </Columns>
    )
  }
}

const mapSignup = state => {
  return {
    form: state.form
  }
}

const mapDispatch = dispatch => {
  return {
    signUp: (firstName, lastName, email, password) =>
      dispatch(signUp(firstName, lastName, email, password)),

    formReset: () => dispatch(formReset())
  }
}

export default connect(mapSignup, mapDispatch)(SignUp)
