import React from 'react'

const PlantForm = props => {
  return (
    <form onSubmit={props.handleSubmit} className="plant-form">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        value={props.state.name}
        onChange={props.handleChange}
      />
      <label htmlFor="imageUrl">Image: </label>
      <input
        type="text"
        name="imageUrl"
        value={props.state.imageUrl}
        onChange={props.handleChange}
      />
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        name="description"
        value={props.state.description}
        onChange={props.handleChange}
      />
      <label htmlFor="light">Light Needed:</label>
      <select
        name="light"
        value={props.state.light}
        onChange={props.handleChange}
      >
        <option value="selection" hidden>
          Lowlight or brightlight?
        </option>
        <option value="lowlight">Lowlight </option>
        <option value="brightlight">brightlight</option>
      </select>
      <label htmlFor="petfriendly">Pet Friendly?</label>

      <select
        name="petfriendly"
        value={props.state.petfriendly}
        onChange={props.handleChange}
      >
        <option value="selection" hidden>
          True/False
        </option>
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        name="quantity"
        value={props.state.quantity}
        onChange={props.handleChange}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  )
}

export default PlantForm
