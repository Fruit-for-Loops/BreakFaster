import React from 'react'

const AddressInput = props => {
  return (
    <div>
      <label htmlFor="name">Name</label>
      <input
        name="name"
        value={props.address.name}
        onChange={() => props.handleChange(event)}
      />
      <label htmlFor="street">Street Address</label>
      <input
        name="street"
        value={props.address.street}
        onChange={() => props.handleChange(event)}
      />
      <label htmlFor="city">City</label>
      <input
        name="city"
        value={props.address.city}
        onChange={() => props.handleChange(event)}
      />
      <label htmlFor="state">State</label>
      <input
        name="state"
        value={props.address.state}
        onChange={() => props.handleChange(event)}
      />
      <label htmlFor="zip">Zip</label>
      <input
        name="zip"
        value={props.address.zip}
        onChange={() => props.handleChange(event)}
      />
    </div>
  )
}
