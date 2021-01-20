import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from '../store'
import {
  Columns,
  Button,
  Section,
  Icon,
  Content,
  Heading,
  Form
} from 'react-bulma-components'
import {formReset} from '../store/form'
/**
 * COMPONENT
 */
class AuthForm extends React.Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    this.props.formReset()
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.login(this.state.email, this.state.password)
  }

  onChange(event) {
    const state = {...this.state}
    state[event.target.name] = event.target.value
    this.setState(state)
  }

  render() {
    const {form} = this.props
    return (
      <Columns id="logIn" breakpoint="mobile" centered>
        <Columns.Column className="control" size="half">
          <form onSubmit={this.handleSubmit}>
            <Section className="pageBox">
              <Heading className="headerLoginSignUp"> Sign in</Heading>

              <Form.Field>
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control iconLeft>
                  <Form.Input
                    placeholder="Please enter your Email"
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
                    placeholder="Please enter your Password"
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

              <Content className="formButtons">
                <Form.Field kind="group" align="right">
                  <Form.Control>
                    <a
                      className="button button is-warning is-focused is-primary"
                      href="/auth/google"
                    >
                      <strong>Login with Google</strong>
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
/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    form: state.form
  }
}

const mapDispatch = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password)),
    formReset: () => dispatch(formReset())
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  login: PropTypes.func.isRequired,
  form: PropTypes.object
}
