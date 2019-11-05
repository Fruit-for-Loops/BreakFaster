import React from 'react'

export const AddressInput = props => {
  return (
    <div>
      <label htmlFor={`${props.id}-name`}>Name</label>
      <input
        name={`${props.id}-name`}
        value={props.address.name}
        onChange={() => props.handleChange(event)}
      />
      <label htmlFor={`${props.id}-street`}>Street Address</label>
      <input
        name={`${props.id}-street`}
        value={props.address.street}
        onChange={() => props.handleChange(event)}
      />
      <label htmlFor={`${props.id}-city`}>City</label>
      <input
        name={`${props.id}-city`}
        value={props.address.city}
        onChange={() => props.handleChange(event)}
      />
      <label htmlFor={`${props.id}-state`}>State</label>
      <input
        name={`${props.id}-state`}
        value={props.address.state}
        onChange={() => props.handleChange(event)}
      />
      <label htmlFor={`${props.id}-zip`}>Zip</label>
      <input
        name={`${props.id}-zip`}
        value={props.address.zip}
        onChange={() => props.handleChange(event)}
      />
    </div>
  )
}
