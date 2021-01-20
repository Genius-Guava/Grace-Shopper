import React from 'react'
import {Columns, Button, Section, Heading, Form} from 'react-bulma-components'

const PlantForm = props => {
  return (
    <Columns id="plant-form" breakpoint="mobile" centered>
      <Columns.Column className="control" size="half">
        <Section className="pageBox">
          <Heading align="center" className="plant-form-heading">
            Add New Plant:
          </Heading>
          <form onSubmit={props.handleSubmit}>
            <Form.Field size="small">
              <Form.Label className="form-label">Name</Form.Label>
              <Form.Control>
                <Form.Input
                  size="small"
                  placeholder="Plant Name"
                  type="text"
                  name="name"
                  value={props.state.name}
                  onChange={props.handleChange}
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
                  value={props.state.imageUrl}
                  onChange={props.handleChange}
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
                  value={props.state.price}
                  onChange={props.handleChange}
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
                  value={props.state.description}
                  onChange={props.handleChange}
                />
              </Form.Control>
            </Form.Field>

            <Form.Field>
              <Form.Label className="form-label">Light Needed:</Form.Label>
              <Form.Select
                size="small"
                name="light"
                value={props.state.light}
                onChange={props.handleChange}
              >
                <option value="selection" hidden>
                  Select
                </option>
                <option value="Low to Partial">Low to Partial </option>
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
                  value={props.state.quantity}
                  onChange={props.handleChange}
                />
              </Form.Control>
            </Form.Field>
            <div align="center">
              <Button
                size="small"
                align="center"
                className="submit-button is-focused is-primary"
              >
                <strong>Submit</strong>
              </Button>
            </div>
          </form>
        </Section>
      </Columns.Column>
    </Columns>
  )
}

export default PlantForm
