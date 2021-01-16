import React, {Component} from 'react'
import PlantForm from './PlantForm'
import {addNewPlant} from '../store/plants'
import {connect} from 'react-redux'

export class NewPlant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/41kT5IhNiwL.jpg',
      price: 50.0,
      description: '',
      light: '',
      quantity: 0
    }
    this.initialState = this.state
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addNewPlant(this.state)
    this.setState(() => this.initialState)
  }

  render() {
    return (
      <div>
        <h3>Add a new plant:</h3>
        <PlantForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          state={this.state}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    plants: state.plants
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNewPlant: plant => dispatch(addNewPlant(plant))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPlant)
