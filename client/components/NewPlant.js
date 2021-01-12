import React, {Component} from 'react'
import PlantForm from './PlantForm'
import {addNewPlant} from '../store/plants'
import {connect} from 'react-redux'

export class NewPlant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      imageUrl: '',
      description: '',
      light: '',
      petfriendly: '',
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
      <PlantForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        state={this.state}
      />
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
