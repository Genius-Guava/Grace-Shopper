import React from 'react'
import {Columns, Button, Section, Heading, Form} from 'react-bulma-components'
import {editPlant, getSinglePlant} from '../store/singlePlant'
import {connect} from 'react-redux'

export class UpdatePlant extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      imageUrl: '',
      price: 0,
      description: '',
      light: '',
      quantity: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getSinglePlant(this.props.match.params.plantId)
  }
  componentDidUpdate(prevProps) {
    if (this.props.plant !== prevProps.plant) {
      this.setState({
        name: this.props.plant.name,
        imageUrl: this.props.plant.imageUrl,
        price: this.props.plant.price,
        description: this.props.plant.description,
        light: this.props.plant.light,
        quantity: this.props.plant.quantity
      })
    }
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.updatePlant(this.props.plant.id, this.state)
  }
  render() {
    return (
      <div>
        {this.props.user.isAdmin ? (
          <Columns id="update-plant-form" breakpoint="mobile" centered>
            <Columns.Column className="control" size="half">
              <Section className="pageBox">
                <Heading align="center" className="plant-form-heading">
                  Update Plant:
                </Heading>
                <form onSubmit={this.handleSubmit}>
                  <Form.Field size="medium">
                    <Form.Label className="form-label">Name</Form.Label>
                    <Form.Control>
                      <Form.Input
                        size="small"
                        placeholder="Plant Name"
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                      />
                    </Form.Control>
                  </Form.Field>
                  <Form.Field>
                    <Form.Label className="form-label">Image URL</Form.Label>
                    <Form.Control>
                      <Form.Input
                        size="small"
                        placeholder="Image URL"
                        type="text"
                        name="imageUrl"
                        value={this.state.imageUrl}
                        onChange={this.handleChange}
                      />
                    </Form.Control>
                  </Form.Field>
                  <Form.Field>
                    <Form.Label className="form-label">Price</Form.Label>
                    <Form.Control>
                      <Form.Input
                        size="small"
                        placeholder="Price"
                        type="number"
                        name="price"
                        value={this.state.price}
                        onChange={this.handleChange}
                      />
                    </Form.Control>
                  </Form.Field>
                  <Form.Field>
                    <Form.Label className="form-label">Description</Form.Label>
                    <Form.Control>
                      <Form.Input
                        size="small"
                        placeholder="Plant Description"
                        type="text"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                      />
                    </Form.Control>
                  </Form.Field>

                  <Form.Field>
                    <Form.Label className="form-label">
                      Light Needed:
                    </Form.Label>
                    <Form.Select
                      size="small"
                      name="light"
                      value={this.state.light}
                      onChange={this.handleChange}
                    >
                      <option value="selection" hidden>
                        Select
                      </option>
                      <option value="Low to Partial">Low to Partial</option>
                      <option value="Bright">Bright</option>
                    </Form.Select>
                    <Form.Control />
                  </Form.Field>

                  <Form.Field>
                    <Form.Label className="form-label">Quantity</Form.Label>
                    <Form.Control>
                      <Form.Input
                        size="small"
                        placeholder="Quantity"
                        type="number"
                        name="quantity"
                        value={this.state.quantity}
                        onChange={this.handleChange}
                      />
                    </Form.Control>
                  </Form.Field>
                  <div align="center">
                    <Button
                      size="small"
                      className="submit-button is-focused is-primary"
                    >
                      <strong>Submit</strong>
                    </Button>
                  </div>
                </form>
              </Section>
            </Columns.Column>
          </Columns>
        ) : (
          <Heading align="center">Admins only!</Heading>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    plant: state.singlePlant,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getSinglePlant: plantId => dispatch(getSinglePlant(plantId)),
    updatePlant: (plantId, plant) => dispatch(editPlant(plantId, plant))
  }
}

export default connect(mapState, mapDispatch)(UpdatePlant)
