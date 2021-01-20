import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {saveProfile} from '../store/user'
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
import {Redirect} from 'react-router-dom'

class UserProfile extends React.Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = {}
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
    this.props.saveProfile(this.state)
  }

  getValue(field) {
    if (this.state[field] !== undefined) {
      return this.state[field]
    }

    if (this.props.user[field] != null) {
      return this.props.user[field]
    }

    return ''
  }

  render() {
    const {form} = this.props

    return (
      <Columns id="userProfile" breakpoint="mobile" centered>
        <Columns.Column className="control" size="half">
          <form onSubmit={this.handleSubmit}>
            <Section className="pageBox2">
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
                    value={this.getValue('firstName')}
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
                    value={this.getValue('lastName')}
                    color={form.errors.lastName && 'danger'}
                  />
                </Form.Control>
                <Form.Help color="danger">{form.errors.lastName}</Form.Help>
              </Form.Field>

              <Form.Field size="medium">
                <Form.Label className="form-label">Address</Form.Label>
                <Form.Control>
                  <Form.Input
                    placeholder="Street"
                    name="address1"
                    type="text"
                    onChange={this.onChange}
                    value={this.getValue('address1')}
                    color={form.errors.address1 && 'danger'}
                  />
                </Form.Control>
                <Form.Help color="danger">{form.errors.address1}</Form.Help>
              </Form.Field>

              <Form.Field size="medium">
                <Form.Control>
                  <Form.Input
                    placeholder="Apt, Suite, Building (Optional)"
                    name="address2"
                    type="text"
                    onChange={this.onChange}
                    value={this.getValue('address2')}
                    color={form.errors.address2 && 'danger'}
                  />
                </Form.Control>
                <Form.Help color="danger">{form.errors.address2}</Form.Help>
              </Form.Field>

              <Form.Field size="medium">
                <Form.Control>
                  <Form.Input
                    placeholder="City"
                    name="city"
                    type="text"
                    onChange={this.onChange}
                    value={this.getValue('city')}
                    color={form.errors.city && 'danger'}
                  />
                </Form.Control>
                <Form.Help color="danger">{form.errors.city}</Form.Help>
              </Form.Field>

              <Form.Field size="is-small" kind="group">
                <Form.Control>
                  <Form.Input
                    placeholder="Zip Code"
                    name="zip"
                    type="text"
                    onChange={this.onChange}
                    value={this.getValue('zip')}
                    color={form.errors.zip && 'danger'}
                  />
                </Form.Control>

                <Form.Control>
                  <Form.Input
                    placeholder="State"
                    name="state"
                    type="text"
                    onChange={this.onChange}
                    value={this.getValue('state')}
                    color={form.errors.state && 'danger'}
                  />
                </Form.Control>
                <Form.Help color="danger">{form.errors.state}</Form.Help>
                <Form.Help color="danger">{form.errors.zip}</Form.Help>
              </Form.Field>

              <Form.Field size="medium">
                <Form.Label className="form-label">Country</Form.Label>
                <Form.Control>
                  <Form.Input
                    disabled
                    value="United States"
                    name="country"
                    type="text"
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field size="medium">
                <Form.Label className="form-label">Phone Number</Form.Label>
                <Form.Control>
                  <Form.Input
                    placeholder="Phone Number"
                    name="phone"
                    type="text"
                    onChange={this.onChange}
                    value={this.getValue('phone')}
                    color={form.errors.phone && 'danger'}
                  />
                </Form.Control>
                <Form.Help color="danger">{form.errors.phone}</Form.Help>
              </Form.Field>

              <Content className="formButtons">
                <Form.Field kind="group" align="right">
                  <Form.Control>
                    <Button className="submit-button is-warning is-focused is-primary">
                      <strong>Submit</strong>
                    </Button>
                  </Form.Control>
                </Form.Field>

                <Form.Help color="danger">{form.errors.other}</Form.Help>
                {form.success && (
                  <div className="notification is-primary">Success!</div>
                )}
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
    form: state.form,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    saveProfile: updates => dispatch(saveProfile(updates)),

    formReset: () => dispatch(formReset())
  }
}

export default connect(mapUserProfile, mapDispatch)(UserProfile)
