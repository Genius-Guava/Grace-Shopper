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

class UserProfile extends React.Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = {
      firstName: '',
      lastName: '',
      strAddress: '',
      apt: '',
      zip: '',
      city: '',
      state: '',
      phoneNumber: '',
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
      <Columns id="userProfile" breakpoint="mobile" centered>
        <Columns.Column className="control" size="half">
          <form onSubmit={this.handleSubmit}>
            <Section className="pageBox">
              <Heading className="headerLoginSignUp">
                Your contact information
              </Heading>

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

              <Form.Field size="medium">
                <Form.Label className="form-label">Street Address</Form.Label>
                <Form.Control>
                  <Form.Input
                    placeholder="Street Address"
                    name="lastName"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.lastName}
                    color={form.errors.lastName && 'danger'}
                  />
                </Form.Control>
                <Form.Help color="danger">{form.errors.lastName}</Form.Help>
              </Form.Field>

              <Form.Field size="medium">
                <Form.Label className="form-label">APT</Form.Label>
                <Form.Control>
                  <Form.Input
                    placeholder="Apt, Suite, Building (Optional)"
                    name="lastName"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.lastName}
                    color={form.errors.lastName && 'danger'}
                  />
                </Form.Control>
                <Form.Help color="danger">{form.errors.lastName}</Form.Help>
              </Form.Field>

              <Form.Field size="medium">
                <Form.Label className="form-label">Zip Code</Form.Label>
                <Form.Control>
                  <Form.Input
                    placeholder="Zip Code"
                    name="lastName"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.lastName}
                    color={form.errors.lastName && 'danger'}
                  />
                </Form.Control>
                <Form.Help color="danger">{form.errors.lastName}</Form.Help>
              </Form.Field>

              <Form.Field size="medium">
                <Form.Label className="form-label">City</Form.Label>
                <Form.Control>
                  <Form.Input
                    placeholder="City"
                    name="lastName"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.lastName}
                    color={form.errors.lastName && 'danger'}
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field size="medium">
                <Form.Label className="form-label">State</Form.Label>
                <Form.Control>
                  <Form.Input
                    placeholder="State"
                    name="lastName"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.lastName}
                    color={form.errors.lastName && 'danger'}
                  />
                </Form.Control>
                <Form.Help color="danger">{form.errors.lastName}</Form.Help>
              </Form.Field>

              {/*
              <div class="col-3">
        	      <input class="effect-1" type="text" placeholder="Country"/>
                <span class="focus-border"></span>
              </div>
                */}

              <Form.Field size="medium">
                <Form.Label className="form-label">Phone Number</Form.Label>
                <Form.Control>
                  <Form.Input
                    placeholder="Phone Number"
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

              <Content className="formButtons">
                <Form.Field kind="group" align="right">
                  <Form.Control>
                    <Button className="submit-button is-warning is-focused is-primary">
                      <strong>Save</strong>
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

const mapUserProfile = state => {
  return {
    form: state.form
  }
}

const mapDispatch = dispatch => {
  return {
    UserProfile: (
      firstName,
      lastName,
      strAddress,
      apt,
      zip,
      city,
      state,
      phoneNumber,
      email,
      password
    ) =>
      dispatch(
        UserProfile(
          firstName,
          lastName,
          strAddress,
          apt,
          zip,
          city,
          state,
          phoneNumber,
          email,
          password
        )
      ),

    formReset: () => dispatch(formReset())
  }
}

export default connect(mapUserProfile, mapDispatch)(UserProfile)
